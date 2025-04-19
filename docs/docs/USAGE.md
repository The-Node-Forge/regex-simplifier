---
title: Usage
description: Basic example and config.
sidebar_position: 3
---

# Usage

Here’s how to use **regex-simplifier** to build, test, and explain regular
expressions.

---

## 📦 Basic Example

```ts
import { build, test, explain } from '@the-node-forge/regex-simplifier';

// Build a regex from a common name
const emailRegex = build('email');
emailRegex.test('me@example.com'); // true

// Test directly with a named pattern
test('12345', 'zip'); // true

// Explain a raw regex
console.log(explain(/^\d{5}$/));
// => This pattern includes:
//    - Starts with
//    - exactly five digits
//    - Ends with
```

---

## ⚙️ Configuration

No configuration is required. All methods work out of the box with TypeScript or
JavaScript projects.

For advanced patterns or to extend functionality in the future, you may eventually be
able to register your own patterns.

---

For API details, see [API_REFERENCE.md](./API_REFERENCE.md).
