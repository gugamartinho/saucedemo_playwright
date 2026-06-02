import { Page, Locator, expect } from "@playwright/test";
import { APP_URLS } from "../utils/url.utils";

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly summarySubTotal: Locator;
  readonly summaryTax: Locator;
  readonly summaryTotal: Locator;
  readonly confirmationHeader: Locator;
  readonly confirmationDetails: Locator;
  readonly productNameInSummary: Locator;
  readonly productDescriptionInSummary: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.summarySubTotal = page.locator('[data-test="subtotal-label"]');
    this.summaryTax = page.locator('[data-test="tax-label"]');
    this.summaryTotal = page.locator('[data-test="total-label"]');
    this.confirmationHeader = page.locator('[data-test="complete-header"]');
    this.confirmationDetails = page.locator('[data-test="complete-text"]');
    this.productNameInSummary = page.locator(
      '[data-test="inventory-item-name"]',
    );
    this.productDescriptionInSummary = page.locator(
      '[data-test="inventory-item-desc"]',
    );
  }

  // actions
  async finish() {
    await this.finishButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  // assertions
  async expectStepTwoLoaded() {
    await expect(this.page).toHaveURL(APP_URLS.CHECKOUT_STEP_TWO);
  }

  async checkProductNameInSummary(expectedName: string) {
    const productName = await this.productNameInSummary.innerText();
    expect(productName).toBe(expectedName);
  }

  async checkProductDescriptionInSummary(expectedDescription: string) {
    const productDescription =
      await this.productDescriptionInSummary.innerText();
    expect(productDescription).toContain(expectedDescription);
  }

  async checkProductPriceInSummary(expectedPrice: string) {
    const price = await this.summarySubTotal.innerText();
    expect(price).toContain(expectedPrice);
  }

  async checkProductTaxInSummary(expectedTax: string) {
    const tax = await this.summaryTax.innerText();
    expect(tax).toContain(expectedTax);
  }

  async checkProductTotalInSummary(expectedTotal: string) {
    const total = await this.summaryTotal.innerText();
    expect(total).toContain(expectedTotal);
  }
}
