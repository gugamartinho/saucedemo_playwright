import { test, expect, VALID_USER } from '../fixtures';

test.describe('Inventory', () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  test('should display 6 products', async ({ inventoryPage }) => {
    const count = await inventoryPage.getItemCount();
    expect(count).toBe(6);
  });

  test('should add item to cart', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('1');
  });

  test('should add multiple items to cart', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('2');
  });

  test('should sort products A to Z', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getItemNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('should sort products Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getItemNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('should sort products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('should sort products by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('should logout successfully', async ({ inventoryPage, page }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL('/');
  });
});
