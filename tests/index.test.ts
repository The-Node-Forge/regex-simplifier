import { build, test, explain } from '../src';

describe('regex-simplifier', () => {
  /* build() ------------------------------------------------------- */
  describe('build()', () => {
    it('returns a valid regex for "email"', () => {
      const regex = build('email');
      expect(regex).toBeInstanceOf(RegExp);
      expect(regex.test('me@email.com')).toBe(true);
    });

    it('throws on unknown pattern names', () => {
      expect(() => build('unknown-pattern')).toThrow(
        'Unknown pattern name: "unknown-pattern"',
      );
    });
  });

  /* test() -------------------------------------------------------- */
  describe('test()', () => {
    it('validates a zip code by pattern name', () => {
      expect(test('12345', 'zip')).toBe(true);
    });

    it('rejects an invalid zip code', () => {
      expect(test('abcde', 'zip')).toBe(false);
    });

    it('works with a raw regex', () => {
      expect(test('123-456', /^\d{3}-\d{3}$/)).toBe(true);
    });
  });

  /* explain() ----------------------------------------------------- */
  describe('explain()', () => {
    it('describes a 5‑digit pattern', () => {
      const out = explain(/^\d{5}$/);
      expect(out).toMatch(/exactly five/i);
      expect(out).toMatch(/digits/i);
    });

    it('describes literals, whitespace, and word characters', () => {
      const out = explain(/^hello\s\w+$/);
      expect(out).toMatch(/literal "hello"/i);
      expect(out).toMatch(/whitespace/i);
      expect(out).toMatch(/word characters?/i);
    });
  });

  /* extra edge‑case tests for all 15 built‑ins -------------------- */
  describe('built‑in pattern edge cases', () => {
    it('email', () => {
      expect(test('user@example.com', 'email')).toBe(true);
      expect(test('alice.bob+test@sub.domain.io', 'email')).toBe(true);

      expect(test('user@domain.csw', 'email')).toBe(false);
      expect(test('user@-domain.com', 'email')).toBe(false);
      expect(test('user@domain-.com', 'email')).toBe(false);
      expect(test('foo@bar.longtld', 'email')).toBe(false);
    });

    it('url', () => {
      expect(test('https://example.com', 'url')).toBe(true);
      expect(test('http://localhost:3000/path?x=1#hash', 'url')).toBe(true);

      expect(test('ftp://example.com', 'url')).toBe(false);
      expect(test('https:/example.com', 'url')).toBe(false);
      expect(test('://missingprotocol.com', 'url')).toBe(false);
      expect(test('http://256.256.256.256', 'url')).toBe(false);
    });

    it('zip', () => {
      expect(test('12345', 'zip')).toBe(true);
      expect(test('12345-6789', 'zip')).toBe(true);
      expect(test('1234', 'zip')).toBe(false);
    });

    it('phone', () => {
      expect(test('415-555-2671', 'phone')).toBe(true);
      expect(test('(415) 555-2671', 'phone')).toBe(true);
      expect(test('+1 415 555 2671', 'phone')).toBe(true);

      expect(test('555', 'phone')).toBe(false);
      expect(test('123-4567-890', 'phone')).toBe(false);
    });

    it('ipv4', () => {
      expect(test('192.168.0.1', 'ipv4')).toBe(true);
      expect(test('255.255.255.255', 'ipv4')).toBe(true);

      expect(test('256.256.256.256', 'ipv4')).toBe(false);
      expect(test('192.168.0', 'ipv4')).toBe(false);
    });

    it('ipv6', () => {
      expect(test('2001:db8:85a3:0000:0000:8a2e:0370:7334', 'ipv6')).toBe(true);
      expect(test('FE80:0000:0000:0000:0202:B3FF:FE1E:8329', 'ipv6')).toBe(true);

      expect(test('::1', 'ipv6')).toBe(false);
      expect(test('12345::', 'ipv6')).toBe(false);
    });

    it('iso-date', () => {
      expect(test('2020-12-31', 'iso-date')).toBe(true);
      expect(test('1999-01-01', 'iso-date')).toBe(true);

      expect(test('2020-13-01', 'iso-date')).toBe(false);
      expect(test('20-12-31', 'iso-date')).toBe(false);
    });

    it('us-date', () => {
      expect(test('12/31/2020', 'us-date')).toBe(true);
      expect(test('01/01/1900', 'us-date')).toBe(true);

      expect(test('31/12/2020', 'us-date')).toBe(false);
      expect(test('12-31-2020', 'us-date')).toBe(false);
    });

    it('time24', () => {
      expect(test('23:59', 'time24')).toBe(true);
      expect(test('00:00:00', 'time24')).toBe(true);

      expect(test('24:00', 'time24')).toBe(false);
      expect(test('12:60', 'time24')).toBe(false);
    });

    it('hex-color', () => {
      expect(test('#abc', 'hex-color')).toBe(true);
      expect(test('#A1B2C3', 'hex-color')).toBe(true);

      expect(test('#ab', 'hex-color')).toBe(false);
      expect(test('abc', 'hex-color')).toBe(false);
    });

    it('rgb-color', () => {
      expect(test('rgb(0,0,0)', 'rgb-color')).toBe(true);
      expect(test('rgb(255, 128, 64)', 'rgb-color')).toBe(true);

      expect(test('rgb(256,0,0)', 'rgb-color')).toBe(false);
      expect(test('rgb(-1,0,0)', 'rgb-color')).toBe(false);
    });

    it('credit-card', () => {
      expect(test('4111111111111111', 'credit-card')).toBe(true);
      expect(test('5500000000000004', 'credit-card')).toBe(true);

      expect(test('1234-5678-9012-3456', 'credit-card')).toBe(false);
      expect(test('411111111111', 'credit-card')).toBe(false);
    });

    it('ssn', () => {
      expect(test('123-45-6789', 'ssn')).toBe(true);
      expect(test('987-65-4321', 'ssn')).toBe(true);

      expect(test('000-00-0000', 'ssn')).toBe(false);
      expect(test('123456789', 'ssn')).toBe(false);
    });

    it('slug', () => {
      expect(test('my-url-slug', 'slug')).toBe(true);
      expect(test('hello-world-123', 'slug')).toBe(true);

      expect(test('My-URL-Slug', 'slug')).toBe(false);
      expect(test('hello_world', 'slug')).toBe(false);
    });

    it('uuid', () => {
      expect(test('550e8400-e29b-41d4-a716-446655440000', 'uuid')).toBe(true);
      expect(test('123e4567-e89b-12d3-a456-426614174000', 'uuid')).toBe(true);

      expect(test('not-a-uuid', 'uuid')).toBe(false);
      expect(test('550e8400e29b41d4a716446655440000', 'uuid')).toBe(false);
    });
  });
});
