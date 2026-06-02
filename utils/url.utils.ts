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

export const APP_URLS = {
  LOGIN: "/",
  INVENTORY: "/inventory.html",
  INVENTORY_ITEM: /\/inventory-item\.html/,
  CART: "/cart.html",
  ABOUT: /saucelabs\.com/,
  CHECKOUT_STEP_ONE: "/checkout-step-one.html",
  CHECKOUT_STEP_TWO: "/checkout-step-two.html",
  CHECKOUT_COMPLETE: "/checkout-complete.html",
};


