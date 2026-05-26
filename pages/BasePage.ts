import { Page, Locator, expect} from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async checkCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(expectedCount));
  }
}
