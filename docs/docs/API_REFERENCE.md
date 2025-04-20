---
title: API Reference
description: API parameters, returns, examples.
sidebar_position: 4
---

# 📘 API Reference

## `build(name: string): RegExp`

Returns a regular expression based on a predefined pattern name.

### Parameters

- `name` — `string`  
  The name of the pattern (e.g. "email", "url", "uuid")

### Returns

- `RegExp`  
  The corresponding regular expression

### Example

```ts
const emailRegex = build('email');
console.log(emailRegex.test('me@example.com')); // true
```

---

## `test(value: string, pattern: string | RegExp): boolean`

Tests a string against either a predefined pattern name or a raw `RegExp`.

### Parameters

- `value` — `string`  
  The string to test
- `pattern` — `string | RegExp`  
  A named pattern or a raw regular expression

### Returns

- `boolean`  
  `true` if the string matches the pattern; otherwise `false`

### Example

```ts
console.log(test('12345', 'zip')); // true
console.log(test('invalid', 'email')); // false
```

---

## `explain(pattern: string | RegExp): string`

Returns a plain-English explanation of a regular expression.

### Parameters

- `pattern` — `string | RegExp`  
  The regular expression to explain

### Returns

- `string`  
  A readable description of the regex pattern

### Example

```ts
console.log(explain(/^\d{5}$/));
/*
This pattern includes:
- Starts with
- exactly five digits
- Ends with
*/
```
