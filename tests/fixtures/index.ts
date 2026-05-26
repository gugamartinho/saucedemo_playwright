import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
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

// Additional test data for checkout process
export const CUSTOMER = {
  firstName: 'David',
  lastName: 'Martinho',
  postalCode: '2000-105',
};

// Extended fixtures
type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
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
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

// Re-export expect for convenience
export { expect } from '@playwright/test';
