import { Page } from "@playwright/test";

export async function changeViewPortToLandscape(page: Page): Promise<void> {
  await page.setViewportSize({ width: 844, height: 390 });
}

export async function changeViewPortToPortrait(page: Page): Promise<void> {
  await page.setViewportSize({ width: 390, height: 844 });
}
