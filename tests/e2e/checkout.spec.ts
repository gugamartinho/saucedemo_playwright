import { test, expect, VALID_USER, CUSTOMER } from '../fixtures';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loginPage, inventoryPage, cartPage, page }) => {
    // Login and add an item before each test
    await loginPage.goto();
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    await expect(page).toHaveURL('/inventory.html');
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL('/checkout-step-one.html');
  });

  test('should complete full checkout flow', async ({ checkoutPage, page }) => {
    // Step 1 - fill in details
    await checkoutPage.fillForm(CUSTOMER.firstName, CUSTOMER.lastName, CUSTOMER.postalCode);
    await checkoutPage.continue();
    await expect(page).toHaveURL('/checkout-step-two.html');

    // Step 2 - review and confirm
    const total = await checkoutPage.getSummaryTotal();
    expect(total).toContain('$');
    await checkoutPage.finish();

    // Confirmation
    await expect(page).toHaveURL('/checkout-complete.html');
    const confirmation = await checkoutPage.getConfirmationMessage();
    expect(confirmation).toContain('Thank you');
  });

  test('should show error when first name is missing', async ({ checkoutPage }) => {
    await checkoutPage.fillForm('', CUSTOMER.lastName, CUSTOMER.postalCode);
    await checkoutPage.continue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('First Name is required');
  });

  test('should show error when last name is missing', async ({ checkoutPage }) => {
    await checkoutPage.fillForm(CUSTOMER.firstName, '', CUSTOMER.postalCode);
    await checkoutPage.continue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Last Name is required');
  });

  test('should show error when postal code is missing', async ({ checkoutPage }) => {
    await checkoutPage.fillForm(CUSTOMER.firstName, CUSTOMER.lastName, '');
    await checkoutPage.continue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Postal Code is required');
  });

  test('should cancel checkout and return to cart', async ({ checkoutPage, page }) => {
    await checkoutPage.cancel();
    await expect(page).toHaveURL('/cart.html');
  });

  test('should display correct item in order summary', async ({ checkoutPage, page }) => {
    await checkoutPage.fillForm(CUSTOMER.firstName, CUSTOMER.lastName, CUSTOMER.postalCode);
    await checkoutPage.continue();
    await expect(page).toHaveURL('/checkout-step-two.html');
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
  });

  test('should complete checkout with multiple items', async ({ loginPage, inventoryPage, cartPage, checkoutPage, page }) => {
    // Go back and add a second item
    await page.goto('/inventory.html');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await cartPage.goto();
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(2);

    await cartPage.proceedToCheckout();
    await checkoutPage.fillForm(CUSTOMER.firstName, CUSTOMER.lastName, CUSTOMER.postalCode);
    await checkoutPage.continue();
    await checkoutPage.finish();

    await expect(page).toHaveURL('/checkout-complete.html');
    const confirmation = await checkoutPage.getConfirmationMessage();
    expect(confirmation).toContain('Thank you');
  });
});
