import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

// Test constants
export const VALID_USER = {
  username: 'standard_user',
  password: 'secret_sauce',
};

export const LOCKED_USER = {
  username: 'locked_out_user',
  password: 'secret_sauce',
};

export const PERFORMANCE_USER = {
  username: 'performance_glitch_user',
  password: 'secret_sauce',
};

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

export { expect } from '@playwright/test';
