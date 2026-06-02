import { test, expect, VALID_USER, LOCKED_USER } from "../fixtures";
import products from "../fixtures/products/productsData.json";

test.describe("Login", () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER.username, VALID_USER.password, "mobile");
    await inventoryPage.expectLoaded();
  });

  test("@mobile open menu", async ({ basePage }) => {
    await basePage.openMenu("mobile");
    await basePage.checkMenuIsOpen();
  });

  test("@mobile go to About page", async ({ basePage }) => {
    await basePage.openMenu("mobile");
    await basePage.checkMenuIsOpen();
    await basePage.openAbout("mobile");
  });

  test("@mobile go to cart", async ({ basePage }) => {
    await basePage.openShoppingCart("mobile");
  });

  test("@mobile going back from cart should return to Inventory page", async ({
    page,
    basePage,
    inventoryPage,
  }) => {
    await basePage.openShoppingCart("mobile");
    await page.goBack();
    await inventoryPage.expectLoaded();
  });

  test("@mobile open item and go back should return to Inventory page", async ({
    inventoryPage,
    inventoryItemPage,
  }) => {
    await inventoryPage.openItem(products.products[0].name, "mobile");
    await inventoryItemPage.expectInventoryItemPageLoaded();
    await inventoryItemPage.backToProducts("mobile");
  });

  test("@mobile logout via menu should return to login page", async ({
    page,
    basePage,
    loginPage,
  }) => {
    await basePage.logout("mobile");
    await loginPage.expectLoaded();
  });

  test("@mobile menu closes when selecting option", async ({
    page,
    basePage,
  }) => {
    await basePage.openMenu("mobile");
    await basePage.openAbout("mobile");
    await basePage.checkMenuIsHidden();
  });
});
