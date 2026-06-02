import { Page, Locator, expect } from "@playwright/test";
import { APP_URLS } from "../utils/url.utils";
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // actions
  async goto() {
    await this.page.goto(APP_URLS.LOGIN);
  }

  async login(username: string, password: string, testType: string = "desktop") {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    if (testType === "mobile") {
      await this.loginButton.tap();
    } else {
      await this.loginButton.click();
    }
  }

  // assertions
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(APP_URLS.LOGIN);
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }

  async checkErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }
}
