export interface PatternDef {
  name: string;
  regex: RegExp;
  description: string;
}

// TLDs we allow in both email and URL validation
const validTLDs = [
  'com',
  'net',
  'org',
  'io',
  'co',
  'us',
  'uk',
  'de',
  'jp',
  'fr',
  'ru',
  'ch',
  'it',
  'edu',
  'gov',
] as const;

// Simplified RFC5322 local‑part and domain‑label
const emailLocal = "[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+";
const emailDomainLabel = '[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?';

/**
 * Top 15 common regex definitions with names and descriptions.
 * Used by build() and explain().
 */
export const patterns: PatternDef[] = [
  {
    name: 'email',
    regex: new RegExp(
      `^${emailLocal}@(?:${emailDomainLabel}\\.)+(?:${validTLDs.join('|')})$`,
      'i',
    ),
    description: 'Validates an email address',
  },
  {
    name: 'url',
    // Only http/https, no ftp; requires a domain (or localhost), optional port & path
    regex: new RegExp(
      `^(?:https?:\\/\\/)` + // scheme
        `(?:localhost|` + // localhost OR
        `(?:(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])*)\\.)+` + // labels +
        `(?:${validTLDs.join('|')}))` + // valid TLD
        `(?::\\d{1,5})?` + // optional port
        `(?:\\/\\S*)?` + // optional path/query/fragment
        `$`,
      'i',
    ),
    description:
      'Validates an HTTP(s) URL (no FTP), with localhost or real domain, optional port & path/query/fragment',
  },
  {
    name: 'zip',
    regex: /^\d{5}(?:-\d{4})?$/,
    description: 'Validates a US ZIP code (5 or 9 digits)',
  },
  {
    name: 'phone',
    regex:
      /^(?:\+?1[-.\s]?)?(?:\([2-9][0-8]\d\)|[2-9][0-8]\d)[-.\s]?[2-9]\d{2}[-.\s]?\d{4}$/,
    description:
      'Validates a US phone number (with optional +1, balanced parentheses)',
  },
  {
    name: 'ipv4',
    regex: /^(25[0-5]|2[0-4]\d|1?\d{1,2})(?:\.(25[0-5]|2[0-4]\d|1?\d{1,2})){3}$/,
    description: 'Validates an IPv4 address',
  },
  {
    name: 'ipv6',
    regex: /^([A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}$/,
    description: 'Validates a full IPv6 address (no shorthand)',
  },
  {
    name: 'iso-date',
    regex: /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    description: 'Validates a date in ISO format (YYYY-MM-DD)',
  },
  {
    name: 'us-date',
    regex: /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d\d$/,
    description: 'Validates a date in US format (MM/DD/YYYY)',
  },
  {
    name: 'time24',
    regex: /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/,
    description: 'Validates time in 24‑hour format (HH:mm or HH:mm:ss)',
  },
  {
    name: 'hex-color',
    regex: /^#(?:[0-9A-Fa-f]{3}){1,2}$/,
    description: 'Validates a hexadecimal color code (#RGB or #RRGGBB)',
  },
  {
    name: 'rgb-color',
    regex:
      /^rgb\(\s*(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\s*,\s*(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\s*,\s*(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\s*\)$/,
    description: 'Validates an RGB color value (0–255 each)',
  },
  {
    name: 'credit-card',
    regex: /^(?:4\d{12}(?:\d{3})?|5[1-5]\d{14}|3[47]\d{13})$/,
    description: 'Validates a credit card number (Visa, MasterCard, Amex)',
  },
  {
    name: 'ssn',
    // allow 001–999 except 000 & 666
    regex: /^(?!000|666)\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/,
    description: 'Validates a US Social Security Number',
  },
  {
    name: 'slug',
    regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    description: 'Validates a URL slug (lowercase, numbers, hyphens)',
  },
  {
    name: 'uuid',
    // any version 1–5
    regex: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    description: 'Validates a UUID (versions 1–5)',
  },
];
