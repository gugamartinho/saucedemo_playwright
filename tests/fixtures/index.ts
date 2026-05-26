import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage';
import { CheckoutConfirmationPage } from '../../pages/CheckoutConfirmationPage';
import {BasePage} from '../../pages/BasePage';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Test data for login tests
export const VALID_USER = {
  username: process.env.VALID_USERNAME || '',
  password: process.env.VALID_PASSWORD || '',
};

export const LOCKED_USER = {
  username: process.env.LOCKED_USERNAME || '',
  password: process.env.LOCKED_PASSWORD || '',
};

// Extended fixtures
type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutConfirmationPage: CheckoutConfirmationPage;
  basePage: BasePage;
};

// Extend the base test with our custom fixtures
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
  }
});

// Re-export expect for convenience
export { expect } from '@playwright/test';
