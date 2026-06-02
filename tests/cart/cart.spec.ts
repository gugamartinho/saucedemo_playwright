import { test, expect, VALID_USER } from "../fixtures";
import products from "../fixtures/products/productsData.json";

test.describe("Cart", () => {
  test.beforeEach(
    async ({
      loginPage,
      inventoryPage,
      cartPage,
      basePage,
      checkoutStepOnePage,
    }) => {
      await loginPage.goto();
      await loginPage.login(VALID_USER.username, VALID_USER.password);
      await inventoryPage.expectLoaded();
    },
  );

  test("should be empty by default", async ({ cartPage }) => {
    await cartPage.goto();
    await cartPage.checkNumberOfItems(0);
  });

  test("should show added items in cart", async ({
    inventoryPage,
    cartPage,
    basePage,
  }) => {
    await inventoryPage.addItemToCart(products.products[0].name);
    await inventoryPage.addItemToCart(products.products[1].name);
    await basePage.openShoppingCart();
    await cartPage.checkNumberOfItems(2);
  });

  test("should remove item from cart", async ({
    inventoryPage,
    cartPage,
    basePage,
  }) => {
    await inventoryPage.addItemToCart(products.products[0].name);
    await basePage.openShoppingCart();
    await cartPage.removeItem(products.products[0].name);
    await cartPage.checkNumberOfItems(0);
  });

  test("should navigate to checkout", async ({
    inventoryPage,
    cartPage,
    basePage,
    checkoutStepOnePage,
  }) => {
    await inventoryPage.addItemToCart(products.products[0].name);
    await basePage.openShoppingCart();
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.expectStepOneLoaded();
  });
});
