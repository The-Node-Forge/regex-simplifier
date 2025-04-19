**@the-node-forge/regex-simplifier**

***

# regex-simplifier

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-007acc)
[![NPM Version](https://img.shields.io/npm/v/regex-simplifier)](https://www.npmjs.com/package/regex-simplifier)
[![Build Status](https://img.shields.io/github/actions/workflow/status/the-node-forge/regex-simplifier/ci.yaml?branch=main)](https://github.com/The-Node-Forge/regex-simplifier/actions)
![Platform](https://img.shields.io/badge/platform-node%20%7C%20browser-brightgreen)

[Live Documentation](https://the-node-forge.github.io/regex-simplifier/)

A tiny utility that helps you **understand**, **build**, and **test** regular
expressions using clean, readable code.

---

## ✨ Features

- 🧠 `explain(regex)` — Converts regex into plain English
- 🔍 `test(value, pattern)` — Tests a string against a regex or named pattern
- 🧱 `build(name)` — Generates regex for common use-cases like "email", "url", etc.

---

## 📦 Installation

```bash
npm install regex-simplifier
```

---

## 🚀 Usage

```ts
import { build, test, explain } from 'regex-simplifier';

// Build common patterns
const emailRegex = build('email');
console.log(emailRegex.test('me@example.com')); // true

// Test a value directly
console.log(test('12345', 'zip')); // true

// Explain a raw regex
console.log(explain(/^\d{5}$/));
// => This pattern includes:
//    - Starts with
//    - exactly five digits
//    - Ends with
```

---

## 📚 Built-in Patterns

| Name  | Description                     |
| ----- | ------------------------------- |
| email | Email address pattern           |
| url   | Matches http(s) URLs            |
| zip   | 5-digit US zip code             |
| phone | US phone number with separators |

---

## 🧪 Running Tests

```bash
npm test
```

---

## 📝 License

MIT © 2025 The Node Forge
