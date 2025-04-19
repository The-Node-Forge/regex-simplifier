export const patternRegistry: Record<string, RegExp> = {
  email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  url: /^https?:\/\/[^\s]+$/,
  zip: /^\d{5}$/,
  phone: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
};
