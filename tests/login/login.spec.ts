import { test, expect } from "../fixtures";
import { VALID_USER, LOCKED_USER } from "../../data/users";
import errorMessages from "../fixtures/login/errorMessages.json";

test.describe("Login", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test("should login successfully with valid credentials", async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    await inventoryPage.expectLoaded();
  });

  test("should show error for locked out user", async ({ loginPage }) => {
    await loginPage.login(LOCKED_USER.username, LOCKED_USER.password);
    await loginPage.checkErrorMessage(errorMessages.login.lockedUser);
  });

  test("should show error for invalid credentials", async ({ loginPage }) => {
    await loginPage.login("invalid_user", "wrong_password");
    await loginPage.checkErrorMessage(errorMessages.login.invalidCredentials);
  });

  test("should show error when username is empty", async ({ loginPage }) => {
    await loginPage.login("", VALID_USER.password);
    await loginPage.checkErrorMessage(errorMessages.login.emptyUsername);
  });

  test("should show error when password is empty", async ({ loginPage }) => {
    await loginPage.login(VALID_USER.username, "");
    await loginPage.checkErrorMessage(errorMessages.login.emptyPassword);
  });
});
