import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutStepOnePage } from "../../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../../pages/CheckoutStepTwoPage";
import { CheckoutConfirmationPage } from "../../pages/CheckoutConfirmationPage";
import { BasePage } from "../../pages/BasePage";
import { InventoryItemPage } from "../../pages/InventoryItemPage";

// Extended fixtures
type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutConfirmationPage: CheckoutConfirmationPage;
  basePage: BasePage;
  inventoryItemPage: InventoryItemPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutStepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },
  checkoutStepTwoPage: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },
  checkoutConfirmationPage: async ({ page }, use) => {
    await use(new CheckoutConfirmationPage(page));
  },
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  inventoryItemPage: async ({ page }, use) => {
    await use(new InventoryItemPage(page));
  },
});

export { expect } from "@playwright/test";
