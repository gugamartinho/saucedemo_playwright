import { Page, Locator, expect } from '@playwright/test';

export class CartPage { // Define locators for cart items and buttons
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
    await this.page.goto('/cart.html');
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
    await expect(this.page).toHaveURL('/cart.html');
    await expect(this.cartItems.first()).toBeVisible();
  }
}
