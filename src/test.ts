import { build } from './build';

export const test = (value: string, pattern: string | RegExp): boolean => {
  const regex = typeof pattern === 'string' ? build(pattern) : pattern;
  return regex.test(value);
};
