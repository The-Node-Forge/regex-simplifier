export const quantifierToText = (
  kind: string,
  from?: number,
  to?: number,
  itemText?: string,
): string => {
  const suffix = itemText ? ` ${itemText}` : '';
  const FIVE = 5;

  if (kind === '+') return `one or more${suffix}`;
  if (kind === '*') return `zero or more${suffix}`;
  if (kind === '?') return `optional${suffix}`;

  if (kind === 'Range' && from === to && from !== undefined) {
    const word = from === FIVE ? 'five' : String(from);
    return `exactly ${word}${suffix}`;
  }
  if (kind === 'Range' && from !== undefined && to !== undefined) {
    return `between ${from} and ${to}${suffix}`;
  }
  if (kind === 'Range' && from !== undefined) {
    return `at least ${from}${suffix}`;
  }

  return '';
};
