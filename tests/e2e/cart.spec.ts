import { test, expect, VALID_USER } from '../fixtures';

test.describe('Cart', () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  test('should be empty by default', async ({ cartPage }) => {
    await cartPage.goto();
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(0);
  });

  test('should show added items in cart', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await cartPage.goto();
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(2);
  });

  test('should remove item from cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await cartPage.goto();
    await cartPage.removeItem('Sauce Labs Backpack');
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(0);
  });

  test('should navigate to checkout', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL('/checkout-step-one.html');
  });
});
