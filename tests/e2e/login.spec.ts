import { test, expect, VALID_USER, LOCKED_USER } from '../fixtures';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  test('should show error for locked out user', async ({ loginPage }) => {
    await loginPage.login(LOCKED_USER.username, LOCKED_USER.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('should show error when username is empty', async ({ loginPage }) => {
    await loginPage.login('', VALID_USER.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
  });

  test('should show error when password is empty', async ({ loginPage }) => {
    await loginPage.login(VALID_USER.username, '');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Password is required');
  });
});
