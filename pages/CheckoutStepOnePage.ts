import { Page, Locator, expect } from "@playwright/test";
import { APP_URLS } from "../utils/url.utils";

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // actions
  async fillForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  // assertions
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }

  async expectStepOneLoaded() {
    await expect(this.page).toHaveURL(APP_URLS.CHECKOUT_STEP_ONE);
  }

  async checkErrorMessage(expectedMessage: string) {
    const error = await this.getErrorMessage();
    expect(error).toContain(expectedMessage);
  }
}
