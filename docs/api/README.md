**@the-node-forge/regex-simplifier**

---

<div align="center">

# Regex Simplifier

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-007acc)
[![NPM Version](https://img.shields.io/npm/v/@the-node-forge/regex-simplifier)](https://www.npmjs.com/package/@the-node-forge/regex-simplifier)
[![Build Status](https://img.shields.io/github/actions/workflow/status/the-node-forge/regex-simplifier/ci.yaml?branch=main)](https://github.com/The-Node-Forge/regex-simplifier/actions)
![Platform](https://img.shields.io/badge/platform-node%20%7C%20browser-brightgreen)

[Live Documentation](https://the-node-forge.github.io/regex-simplifier/)

</div>

A tiny utility that helps you **understand**, **build**, and **test** regular
expressions using clean, readable code.

---

## ✨ Features

- 🧠 `explain(regex)` — Converts regex into plain English
- 🔍 `test(value, pattern)` — Tests a string against a regex or named pattern
- 🧱 `build(name)` — Generates regex for common use-cases like "email", "url", etc.
- 💬 Clean console formatting for output clarity
- 🌐 Supports both Node.js and browser environments

---

## 📦 Installation

```bash
npm install @the-node-forge/regex-simplifier
```

---

## 🚀 Usage

```ts
import { build, test, explain } from '@the-node-forge/regex-simplifier';

// Build common patterns
const emailRegex = build('email');
console.log(emailRegex.test('me@example.com')); // true

// Test a value directly
console.log(test('12345', 'zip')); // true
console.log(test('https://the-node-forge.dev', 'url')); // true

// Explain a raw regex
console.log(explain(/^\d{5}$/));
// => This pattern includes:
//    - Starts with
//    - exactly five digits
//    - Ends with
```

---

## 📚 Built-in Patterns

| Name        | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| email       | Validates an email address                                                        |
| url         | Validates an HTTP(s) URL (no FTP), with localhost or domain, optional port & path |
| zip         | Validates a US ZIP code (5 or 9 digits)                                           |
| phone       | Validates a US phone number (with optional +1, balanced parentheses)              |
| ipv4        | Validates an IPv4 address                                                         |
| ipv6        | Validates a full IPv6 address (no shorthand)                                      |
| iso-date    | Validates a date in ISO format (YYYY-MM-DD)                                       |
| us-date     | Validates a date in US format (MM/DD/YYYY)                                        |
| time24      | Validates time in 24‑hour format (HH:mm or HH:mm:ss)                              |
| hex-color   | Validates a hexadecimal color code (#RGB or #RRGGBB)                              |
| rgb-color   | Validates an RGB color value (0–255 each)                                         |
| credit-card | Validates a credit card number (Visa, MasterCard, Amex)                           |
| ssn         | Validates a US Social Security Number                                             |
| slug        | Validates a URL slug (lowercase, numbers, hyphens)                                |
| uuid        | Validates a UUID (versions 1–5)                                                   |

---

## 💡 Contributing

We welcome contributions! Feel free to open an
[issue](https://github.com/The-Node-Forge/regex-simplifier/issues) or submit a
[pull request](https://github.com/The-Node-Forge/regex-simplifier/pulls).

---

## ⭐ Support

If you find Regex Simplifier helpful, give it a ⭐ on
[GitHub](https://github.com/The-Node-Forge/regex-simplifier).

---

## 🔗 Links

- 📦 [NPM Package](https://www.npmjs.com/package/@the-node-forge/regex-simplifier)
- 📖 [Live Docs](https://the-node-forge.github.io/regex-simplifier/)
- 🏠 [The-Node-Forge Org](https://github.com/The-Node-Forge)

---

## 📖 Docs

Full documentation available at:
[https://the-node-forge.github.io/regex-simplifier](https://the-node-forge.github.io/regex-simplifier)

---

## 📝 License

MIT © 2025 The Node Forge
