import { walkRegexAST } from './helpers/walkRegexAST';

export function explain(pattern: string | RegExp): string {
  return walkRegexAST(pattern);
}
