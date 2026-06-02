import { Page, Locator, expect } from "@playwright/test";
import { APP_URLS } from "../utils/url.utils";

export class BasePage {
  readonly page: Page;
  readonly menuWrap: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly aboutLink: Locator;
  readonly inventoryLink: Locator;
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
    this.aboutLink = page.locator("#about_sidebar_link");
    this.inventoryLink = page.locator("#inventory_sidebar_link");
  }

  async logout(testType: string = "desktop"): Promise<void> {
    if (testType === "mobile") {
      await this.menuButton.tap();
      await this.logoutLink.tap();
    } else {
      await this.menuButton.click();
      await this.logoutLink.click();
    }
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

  async openMenu(option: string, testType: string = "desktop") {
    if (testType === "mobile") {
      await this.menuButton.tap();
    } else {
      await this.menuButton.click();
    }
  }

  async closeMenu(testType: string = "desktop") {
    if (testType === "mobile") {
      await this.menuCloseButton.tap();
    } else {
      await this.menuCloseButton.click();
    }
  }

  async checkMenuIsOpen() {
    await expect(this.menuWrap).toBeVisible();
  }

  async checkMenuIsHidden() {
    await expect(this.menuWrap).toBeHidden();
  }

  async checkLogoIsCentered() {
    const position = await this.logo.evaluate(
      (el) => el.getBoundingClientRect().left,
    );
    await expect(position).toBeGreaterThanOrEqual(50);
  }

  async openAbout(testType: string = "desktop") {
    if (testType === "mobile") {
      await this.aboutLink.tap();
    } else {
      await this.aboutLink.click();
    }
    await expect(this.page).toHaveURL(APP_URLS.ABOUT);
  }

  async openShoppingCart(testType: string = "desktop") {
    if (testType === "mobile") {
      await this.cartLink.tap();
    } else {
      await this.cartLink.click();
    }
    await expect(this.page).toHaveURL(APP_URLS.CART);
  }

  async openInventory(testType: string = "desktop") {
    if (testType === "mobile") {
      await this.inventoryLink.tap();
    } else {
      await this.inventoryLink.click();
    }
    await expect(this.page).toHaveURL(APP_URLS.INVENTORY);
  }
}
