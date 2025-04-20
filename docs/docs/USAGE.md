---
title: Usage
description: Basic example and config.
sidebar_position: 3
---

# 🚀 Usage

Here’s how to use **regex-simplifier** to build, test, and explain regular
expressions with ease.

---

## 📦 Basic Example

```ts
import { build, test, explain } from '@the-node-forge/regex-simplifier';

// Build a regex from a common name
const emailRegex = build('email');
emailRegex.test('me@example.com'); // true

// Test directly with a named pattern
console.log(test('12345', 'zip')); // true

// Explain a raw regex
console.log(explain(/^\d{5}$/));
// => This pattern includes:
//    - Starts with
//    - exactly five digits
//    - Ends with
```

---

## ⚙️ Configuration

No configuration is required.

All methods work seamlessly in JavaScript and TypeScript projects, both in the
browser and Node.js environments.

---

## 🔍 Explore More

- For full API details, check out the [API Reference](./API_REFERENCE.md)
- To view all supported patterns, see the
  [README](https://github.com/The-Node-Forge/regex-simplifier#-built-in-patterns)
- For installation steps, visit the [Installation Guide](./INSTALLATION.md)

---
