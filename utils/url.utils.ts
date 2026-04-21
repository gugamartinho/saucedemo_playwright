/**
 * Returns the path segment of a URL (everything after the domain)
 */
export function getUrlPath(url: string): string {
  return new URL(url).pathname;
}

/**
 * Validates if a string is a valid absolute URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
