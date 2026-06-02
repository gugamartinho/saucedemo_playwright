import { Page, Locator, expect } from "@playwright/test";
import { APP_URLS } from "../utils/url.utils";

export class CartPage {
  // Define locators for cart items and buttons
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.removeButton = page.locator('[data-test*="remove"]');
  }

  // actions
  async goto() {
    await this.page.goto(APP_URLS.CART);
  }

  async removeItem(itemName: string) {
    const item = this.cartItems.filter({ hasText: itemName });
    await item.locator(this.removeButton).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  // assertions
  async checkNumberOfItems(expectedCount: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(APP_URLS.CART);
    await expect(this.cartItems.first()).toBeVisible();
  }
}
