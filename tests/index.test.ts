import { build, test, explain } from '../src';

describe('regex-simplifier', () => {
  describe('build()', () => {
    it('should return a valid regex for "email"', () => {
      const regex = build('email');
      expect(regex).toBeInstanceOf(RegExp);
      expect(regex.test('me@email.com')).toBe(true);
    });

    it('should throw an error for unknown pattern', () => {
      expect(() => build('unknown-pattern')).toThrowError(
        'Unknown pattern name: "unknown-pattern"',
      );
    });
  });

  describe('test()', () => {
    it('should return true for valid zip code using pattern name', () => {
      expect(test('12345', 'zip')).toBe(true);
    });

    it('should return false for invalid zip code', () => {
      expect(test('abcde', 'zip')).toBe(false);
    });

    it('should work with raw regex', () => {
      expect(test('123-456', /^\d{3}-\d{3}$/)).toBe(true);
    });
  });

  describe('explain()', () => {
    it('should explain a 5-digit pattern', () => {
      const explanation = explain(/^\d{5}$/);
      expect(explanation).toMatch(/five digits/);
    });

    it('should explain multiple parts', () => {
      const explanation = explain(/^hello\s\w+$/);
      expect(explanation).toMatch(/Starts with/);
      expect(explanation).toMatch(/whitespace character/);
      expect(explanation).toMatch(/word character/);
    });
  });
});
