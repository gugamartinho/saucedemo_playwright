import { expect, Locator, Page } from "@playwright/test";

type SortOption = "az" | "za" | "lohi" | "hilo";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly inventoryItemNames: Locator;
  readonly inventoryItemPrices: Locator;
  readonly sortDropdown: Locator;
  readonly sortDropdownActiveOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator(".inventory_item");
    this.inventoryItemNames = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemPrices = page.locator(
      '[data-test="inventory-item-price"]',
    );
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.sortDropdownActiveOption = page.locator('[data-test="active-option"]');
  }

  // actions
  async goto() {
    await this.page.goto("/inventory.html");
  }

  async addItemToCart(itemName: string): Promise<void> {
    const item = this.getInventoryItemByName(itemName);
    await item.getByRole("button", { name: "Add to cart" }).click();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getItemNames(): Promise<string[]> {
    return await this.inventoryItemNames.allInnerTexts();
  }

  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItemPrices.allInnerTexts();
    return priceTexts.map((price) => Number(price.replace("$", "")));
  }

  private getInventoryItemByName(itemName: string): Locator {
    // Scope actions to the product card so similarly named products do not clash.
    return this.inventoryItems.filter({
      has: this.page.locator('[data-test="inventory-item-name"]', {
        hasText: itemName,
      }),
    });
  }

  // assertions
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL("/inventory.html");
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async checkNumberOfItems(expectedCount: number): Promise<void> {
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }

  async checkProductsSortedAscByName(): Promise<void> {
    const names = await this.getItemNames();
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
  }

  async checkProductsSortedDescByName(): Promise<void> {
    const names = await this.getItemNames();
    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
  }

  async checkProductsSortedAscByPrice(): Promise<void> {
    const prices = await this.getItemPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  }

  async checkProductsSortedDescByPrice(): Promise<void> {
    const prices = await this.getItemPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  }

  async checkActiveOptionFilterIsHidden() {
    await expect(this.sortDropdownActiveOption).toBeHidden();
  }

  async checkProductWidth() {
    const width = await this.inventoryItems
      .first()
      .evaluate((el) => el.getBoundingClientRect().width);
    expect(width).toBeGreaterThan(300);
  }

  async checkFirstProductIsVisibleOnGrid() {
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async checkLastItemIsVisible() {
    await this.inventoryItems.last().scrollIntoViewIfNeeded();
    await expect(this.inventoryItems.last()).toBeVisible();
  }
}
