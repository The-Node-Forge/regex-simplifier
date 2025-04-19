import { patternRegistry } from './patterns';

export function build(name: string): RegExp {
  const key = name.toLowerCase();
  if (!patternRegistry[key]) {
    throw new Error(`Unknown pattern name: "${name}"`);
  }
  return patternRegistry[key];
}
