/**
 * Validates if a string is a valid ISO date
 */
export function isValidDate(dateString: string): boolean {
  return new Date(dateString).toString() !== 'Invalid Date';
}

/**
 * Returns true if the date is within the last N minutes
 */
export function isRecentDate(dateString: string, withinMinutes: number = 5): boolean {
  const date = new Date(dateString).getTime();
  const now = Date.now();
  const diff = (now - date) / 1000 / 60;
  return diff <= withinMinutes;
}
