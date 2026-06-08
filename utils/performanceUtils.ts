import { Page, expect } from "@playwright/test";

/**
 * Validates the load time of a page by waiting for a specific selector.
 * Useful for performance testing across multiple pages.
 *
 * @param page - Playwright Page instance.
 * @param selector - Selector that indicates the page has finished loading.
 * @param maxLoadTime - Maximum allowed load time in milliseconds.
 * @param pageName - Name of the page for logging purposes.
 */
export async function validatePageLoadTime(
  page: Page,
  url: string,
  selector: string,
  maxLoadTime: number = 3000,
  pageName: string = "Page",
): Promise<void> {
  const start = Date.now();
  
  await page.goto(url);
  await expect(page.locator(selector)).toBeVisible();

  const loadTime = Date.now() - start;
  console.log(`${pageName} loaded in ${loadTime}ms`);

  expect(loadTime).toBeLessThan(maxLoadTime);
}
