import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly menuWrap: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuCloseButton: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.menuCloseButton = page.locator("#react-burger-cross-btn");
    this.menuWrap = page.locator(".bm-menu-wrap");
    this.logoutLink = page.locator("#logout_sidebar_link");
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.logo = page.locator(".app_logo");
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

  async checkMenuButtonIsVisible() {
    await expect(this.menuButton).toBeVisible();
  }

  async checkMenuWrapIsHidden() {
    await expect(this.menuWrap).toBeHidden();
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async closeMenu() {
    await this.menuCloseButton.click();
  }

  async checkMenuIsOpen() {
    await expect(this.menuWrap).toBeVisible();
  }

  async checkLogoIsCentered() {
    const position = await this.logo.evaluate(
      (el) => el.getBoundingClientRect().left,
    );
    await expect(position).toBeGreaterThanOrEqual(50);
  }
}
