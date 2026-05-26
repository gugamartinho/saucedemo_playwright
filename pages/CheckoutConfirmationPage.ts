import { Page, Locator, expect} from '@playwright/test';

export class CheckoutConfirmationPage {
  readonly page: Page;
  readonly confirmationHeader: Locator;
  readonly confirmationDetails: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmationHeader = page.locator('[data-test="complete-header"]');
    this.confirmationDetails = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  // actions
  async goBackHome() {
    await this.backHomeButton.click();
  }

  // assertions
  async getConfirmationMessage(): Promise<string> {
    return await this.confirmationHeader.innerText();
  }

  async getDetailsMessage(): Promise<string> {
    return await this.confirmationDetails.innerText();
  }

  async expectConfirmationLoaded() {
    await expect(this.page).toHaveURL('/checkout-complete.html');
  }

  async checkHeaderMessage(expectedMessage: string) {
    const confirmation = await this.getConfirmationMessage();
    expect(confirmation).toContain(expectedMessage);
  }

  async checkDetailsMessage(expectedMessage: string) {
    const details = await this.getDetailsMessage();
    expect(details).toContain(expectedMessage);
  }
}
