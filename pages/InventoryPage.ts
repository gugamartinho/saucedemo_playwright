import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addItemToCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('button').click();
  }

  async getCartCount(): Promise<string> {
    return await this.cartBadge.innerText();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getItemNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allInnerTexts();
  }

  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('.inventory_item_price').allInnerTexts();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
