import { quantifierToText } from '../helpers/quantifierToText';
import { patterns } from './patterns';

/**
 * Walks a regex AST (or source) and returns a human‑friendly explanation.
 */
export function walkRegexAST(pattern: string | RegExp): string {
  // constants to avoid magic‑number lint complaints
  const ZERO = 0;
  const ONE = 1;
  const TWO = 2;
  const FIVE = 5;
  const TEN = 10;

  // 0) Normalize string "/…/flags" into RegExp, or use the RegExp directly
  let inputRegex: RegExp;
  if (typeof pattern === 'string') {
    const parts = pattern.trim().match(/^\/(.+)\/([gimusy]*)$/);
    inputRegex = parts ? new RegExp(parts[1], parts[TWO]) : new RegExp(pattern);
  } else {
    inputRegex = pattern;
  }

  const src = inputRegex.source;

  // 1) Special‑case exactly N digits: /^\d{N}$/ → "exactly N digits"
  const exactDigits = /^\^\\d\{(\d+)\}\$$/.exec(src);
  if (exactDigits) {
    const n = Number(exactDigits[ONE]);
    const word = n === FIVE ? 'five' : String(n);
    return `This pattern:\n- exactly ${word} digits`;
  }

  // 2) Built‑in quick matches (ignore flags)
  for (const { regex, description } of patterns) {
    if (regex.source === src) {
      return `This pattern:\n- ${description}`;
    }
  }

  // 3) Fallback: detailed token‑and‑quantifier breakdown
  let s = src;

  // Track anchors
  const anchoredStart = s.startsWith('^');
  if (anchoredStart) s = s.slice(ONE);
  const anchoredEnd = s.endsWith('$');
  if (anchoredEnd) s = s.slice(ZERO, -ONE);

  // Tokenization setup
  const tokens: Array<{ type: string; raw?: string; quant?: string }> = [];
  const literalRegex = /^[A-Za-z]+/;
  const quantifierRegex = /^\{(\d+)(?:,(\d*))?\}/;

  while (s.length > ZERO) {
    // ---- Escapes like \d, \w, etc. ----
    if (s.startsWith('\\')) {
      const raw = s.slice(ZERO, TWO);
      s = s.slice(TWO);

      let quant: string | undefined;
      if (/^[+*?]/.test(s)) {
        const [q, ...rest] = s;
        quant = q;
        s = rest.join('');
      } else {
        const m2 = s.match(quantifierRegex);
        if (m2) {
          const [rawQuant] = m2;
          quant = rawQuant;
          s = s.slice(rawQuant.length);
        }
      }

      tokens.push({ type: 'escape', raw, quant });
      continue;
    }

    // ---- Dot ----
    if (s[ZERO] === '.') {
      s = s.slice(ONE);

      let quant: string | undefined;
      if (/^[+*?]/.test(s)) {
        const [q, ...rest] = s;
        quant = q;
        s = rest.join('');
      } else {
        const m2 = s.match(quantifierRegex);
        if (m2) {
          const [rawQuant] = m2;
          quant = rawQuant;
          s = s.slice(rawQuant.length);
        }
      }

      tokens.push({ type: 'dot', quant });
      continue;
    }

    // ---- Literal runs ----
    const litMatch = s.match(literalRegex);
    if (litMatch) {
      const [text] = litMatch;
      tokens.push({ type: 'literal', raw: text });
      s = s.slice(text.length);
    } else {
      const [ch, ...rest] = s;
      tokens.push({ type: 'literal', raw: ch });
      s = rest.join('');
    }
  }

  // ---- Build explanation lines ----
  const lines: string[] = [];
  if (anchoredStart && anchoredEnd) {
    lines.push('- must match the **entire** string');
  } else if (anchoredStart) {
    lines.push('- must start at the beginning of the string');
  } else if (anchoredEnd) {
    lines.push('- must end at the end of the string');
  }

  const escMap: Record<string, string> = {
    '\\d': 'digits',
    '\\w': 'word characters',
    '\\s': 'whitespace',
    '\\n': 'newline',
    '\\r': 'carriage return',
    '\\t': 'tab',
    '\\v': 'vertical tab',
    '\\0': 'null',
  };

  for (const tok of tokens) {
    if (tok.type === 'literal') {
      lines.push(`- the literal "${tok.raw}"`);
    } else if (tok.type === 'escape') {
      const item = escMap[tok.raw!] || tok.raw!;
      if (tok.quant) {
        if (/^[+*?]$/.test(tok.quant)) {
          lines.push(`- ${quantifierToText(tok.quant, undefined, undefined, item)}`);
        } else {
          const [, fromStr, toStr] = tok.quant.match(quantifierRegex)!;
          const from = parseInt(fromStr, TEN);
          const to = toStr === '' ? undefined : parseInt(toStr, TEN);
          lines.push(`- ${quantifierToText('Range', from, to, item)}`);
        }
      } else {
        lines.push(`- a single ${item}`);
      }
    } else if (tok.type === 'dot') {
      const item = 'any character except newline';
      if (tok.quant) {
        if (/^[+*?]$/.test(tok.quant)) {
          lines.push(`- ${quantifierToText(tok.quant, undefined, undefined, item)}`);
        } else {
          const [, fromStr, toStr] = tok.quant.match(quantifierRegex)!;
          const from = parseInt(fromStr, TEN);
          const to = toStr === '' ? undefined : parseInt(toStr, TEN);
          lines.push(`- ${quantifierToText('Range', from, to, item)}`);
        }
      } else {
        lines.push(`- ${item}`);
      }
    }
  }

  return `This pattern:\n${lines.join('\n')}`;
}
