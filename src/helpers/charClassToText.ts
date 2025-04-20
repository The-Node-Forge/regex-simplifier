/**
 * Turn a raw character‐class or escape sequence into human‐friendly text.
 * E.g. '\\d' → 'digits', '[a-z]' → 'lower‑case letters', '\\.' → 'a literal dot'.
 */
export const charClassToText = (raw: string): string => {
  // Common escapes
  if (raw === '\\d') return 'digits';
  if (raw === '\\w') return 'word characters';
  if (raw === '\\s') return 'whitespace';

  // Literal dot
  if (raw === '\\.') return 'a literal dot';

  const ONE = 1;

  // Strip the surrounding brackets and hyphens
  const inner = raw.slice(1, -ONE);
  if (inner === 'a-z') return 'lower‑case letters';
  if (inner === 'A-Z') return 'upper‑case letters';
  if (inner === '0-9') return 'digits';

  // Anything else (e.g. [abc] → 'abc')
  return inner;
};
