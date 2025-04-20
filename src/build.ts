import { patterns, PatternDef } from './helpers/patterns';

export const build = (name: string): RegExp => {
  const key = name.toLowerCase();
  const def: PatternDef | undefined = patterns.find((p) => p.name === key);
  if (!def) throw new Error(`Unknown pattern name: "${name}"`);
  return def.regex;
};
