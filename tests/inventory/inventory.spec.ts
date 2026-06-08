import { test, expect } from "../fixtures";
import { VALID_USER } from "../../data/users";
import products from "../fixtures/products/productsData.json";

test.describe("Inventory", () => {
  test.beforeEach(async ({ loginPage, inventoryPage, basePage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    await inventoryPage.expectLoaded();
  });

  test("should display 6 products", async ({ inventoryPage }) => {
    await inventoryPage.checkNumberOfItems(6);
  });

  test("should add item to cart", async ({ inventoryPage, basePage }) => {
    await inventoryPage.addItemToCart(products.products[0].name);
    await basePage.checkCartBadgeCount(1);
  });

  test("should add multiple items to cart", async ({
    inventoryPage,
    basePage,
  }) => {
    await inventoryPage.addItemToCart(products.products[0].name);
    await inventoryPage.addItemToCart(products.products[1].name);
    await basePage.checkCartBadgeCount(2);
  });

  test("should sort products A to Z", async ({ inventoryPage }) => {
    await inventoryPage.sortBy("az");
    await inventoryPage.checkProductsSortedAscByName();
  });

  test("should sort products Z to A", async ({ inventoryPage }) => {
    await inventoryPage.sortBy("za");
    await inventoryPage.checkProductsSortedDescByName();
  });

  test("should sort products by price low to high", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy("lohi");
    await inventoryPage.checkProductsSortedAscByPrice();
  });

  test("should sort products by price high to low", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy("hilo");
    await inventoryPage.checkProductsSortedDescByPrice();
  });
});
