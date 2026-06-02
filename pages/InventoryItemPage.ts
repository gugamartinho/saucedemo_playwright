import { expect, Locator, Page } from "@playwright/test";
import { APP_URLS } from "../utils/url.utils";

export class InventoryItemPage {
  readonly page: Page;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backToProductsButton = page.locator("#back-to-products");
  }

  // actions
  async backToProducts(testType: string = "desktop"): Promise<void> {
    if (testType === "mobile") {
      await this.backToProductsButton.tap();
    } else {
      await this.backToProductsButton.click();
    }
    await expect(this.page).toHaveURL(APP_URLS.INVENTORY);
  }

  // assertions
  async expectInventoryItemPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(APP_URLS.INVENTORY_ITEM);
  }
}
