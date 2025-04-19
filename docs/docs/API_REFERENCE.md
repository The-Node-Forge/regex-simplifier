---
title: API Reference
description: API parameters, returns, examples.
sidebar_position: 4
---

### `build(name: string): RegExp`

Returns a regular expression based on a predefined pattern name.

**Parameters:**

- `name` — `string` — Name of the pattern (e.g. "email", "url")

**Returns:**

- `RegExp` — The corresponding regular expression

**Example:**

```ts
const emailRegex = build('email');
console.log(emailRegex.test('me@example.com')); // true
```

---

### `test(value: string, pattern: string | RegExp): boolean`

Tests a string against either a predefined pattern name or a raw RegExp.

**Parameters:**

- `value` — `string` — The string to test
- `pattern` — `string | RegExp` — A predefined pattern name or a regular expression

**Returns:**

- `boolean` — `true` if the string matches, `false` otherwise

**Example:**

```ts
console.log(test('12345', 'zip')); // true
console.log(test('invalid', 'email')); // false
```

---

### `explain(pattern: string | RegExp): string`

Returns a plain-English explanation of what a regular expression does.

**Parameters:**

- `pattern` — `string | RegExp` — The pattern to explain

**Returns:**

- `string` — Human-readable explanation of the regex

**Example:**

```ts
console.log(explain(/^\d{5}$/));
// This pattern includes:
// - Starts with
// - exactly five digits
// - Ends with
```
