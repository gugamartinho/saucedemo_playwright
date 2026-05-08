import { expect, Locator, Page } from '@playwright/test';

type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly inventoryItemNames: Locator;
  readonly inventoryItemPrices: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.inventoryItemNames = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemPrices = page.locator('[data-test="inventory-item-price"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL('/inventory.html');
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addItemToCart(itemName: string): Promise<void> {
    const item = this.getInventoryItemByName(itemName);
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async getCartCount(): Promise<number> {
    // SauceDemo only renders the badge after the first item is added.
    if ((await this.cartBadge.count()) === 0) {
      return 0;
    }

    const badgeText = await this.cartBadge.innerText();
    return Number(badgeText);
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getItemNames(): Promise<string[]> {
    return await this.inventoryItemNames.allInnerTexts();
  }

  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItemPrices.allInnerTexts();
    return priceTexts.map(price => Number(price.replace('$', '')));
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  private getInventoryItemByName(itemName: string): Locator {
    // Scope actions to the product card so similarly named products do not clash.
    return this.inventoryItems.filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: itemName }),
    });
  }
}
