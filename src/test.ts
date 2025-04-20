import { build } from './build';

export function test(value: string, pattern: string | RegExp): boolean {
  const re = typeof pattern === 'string' ? build(pattern) : pattern;
  return re.test(value);
}
