/**
 * Validates if a string is a valid email format
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates if a string is non-empty after trimming whitespace
 */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
