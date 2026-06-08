import { test, expect } from "../fixtures";
import { VALID_USER } from "../../data/users";
import { validatePageLoadTime } from "../../utils/performanceUtils";
import {
  createSlowNetworkPage,
  simulateOfflineMode,
} from "@utils/networkSimulator";

test.describe("Mobile Performance Tests", () => {
  test("@mobile login page should load under 3 seconds", async ({ page }) => {
    await validatePageLoadTime(page, "/", "#login-button", 3000, "Login Page");
  });

  test("@mobile inventory page should load under 2.5 seconds", async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER.username, VALID_USER.password, "mobile");
    await inventoryPage.expectLoaded();
    await validatePageLoadTime(
      page,
      "/inventory.html",
      ".inventory_list",
      2500,
      "Inventory Page",
    );
  });

  test("@mobile login page should load under 8 seconds on slow network", async ({
    browser,
  }) => {
    // Simulate slow network conditions
    const { page } = await createSlowNetworkPage(browser, 300);

    await validatePageLoadTime(
      page,
      "/",
      "#login-button",
      8000,
      "Login Page (Slow Network)",
    );
  });

  test("@mobile app should show an offline error when network is disabled", async ({
    browser,
  }) => {
    // Simulate offline mode
    const { page } = await simulateOfflineMode(browser);
    
    let navigationError: Error | null = null; // Initialize variable to capture navigation error

    // Try to navigate to the login page and catch the offline error
    try {
      await page.goto("/");
    } catch (error) {
      navigationError = error as Error;
    }

    // Assert that navigation failed due to network being offline
    expect(navigationError).not.toBeNull();
    expect(navigationError?.message).toContain("ERR_INTERNET_DISCONNECTED");
  });
});
