import { Browser, Page } from "@playwright/test";

/**
 * Creates a new context and page with simulated slow network conditions.
 * Uses request delay to emulate latency across all browsers.
 *
 * @param browser - Playwright Browser instance.
 * @param latency - Delay in milliseconds applied to each request.
 * @returns { page, context } - Ready-to-use page and context.
 */
export async function createSlowNetworkPage(
  browser: Browser,
  latency: number = 300,
): Promise<{ page: Page; context: any }> {
  // Create a new browser context
  const context = await browser.newContext();
  const page = await context.newPage();

  // Simulate slow network by delaying all requests
  await page.route("**/*", async (route) => {
    const start = Date.now();
    await route.continue();

    const elapsed = Date.now() - start;
    if (elapsed < latency) {
      await new Promise((resolve) => setTimeout(resolve, latency - elapsed));
    }
  });

  return { page, context };
}

export async function simulateOfflineMode(browser: Browser): Promise<{ page: Page; context: any }> {
  // Create a new browser context
  const context = await browser.newContext();
  const page = await context.newPage();

  // Enable offline mode
  await context.setOffline(true);

  return { page, context };
}
