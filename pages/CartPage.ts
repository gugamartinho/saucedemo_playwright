import { Page, Locator } from '@playwright/test';

export class CartPage { // Define locators for cart items and buttons
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) { // Initialize locators for cart items and buttons
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async goto() {  // Navigate to the cart page
    await this.page.goto('/cart.html');
  }

  async getCartItemCount(): Promise<number> { // Get the count of cart items
    return await this.cartItems.count();
  }

  async removeItem(itemName: string) {  //  Remove an item from the cart by its name
    const item = this.page.locator('.cart_item').filter({ hasText: itemName }); // Find the cart item by its name
    await item.locator('button').click(); // Click the remove button for the specified item
  }

  async proceedToCheckout() { // Click the checkout button to proceed to the checkout page
    await this.checkoutButton.click();  // Click the checkout button to proceed to the checkout page
  }
}
