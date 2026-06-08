import { test, expect } from "../fixtures";
import { VALID_USER } from "../../data/users";
import checkoutMessages from "../fixtures/checkout/checkoutMessages.json";
import customers from "../fixtures/customers/customerData.json";
import products from "../fixtures/products/productsData.json";

test.describe("Checkout", () => {
  test.beforeEach(
    async ({ loginPage, inventoryPage, cartPage, checkoutStepOnePage }) => {
      await loginPage.goto();
      await loginPage.login(VALID_USER.username, VALID_USER.password);
      await inventoryPage.expectLoaded();
      await inventoryPage.addItemToCart(products.products[0].name);
      await cartPage.goto();
      await cartPage.proceedToCheckout();
      await checkoutStepOnePage.expectStepOneLoaded();
    },
  );

  test("should complete full checkout flow", async ({
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutConfirmationPage,
  }) => {
    await checkoutStepOnePage.fillForm(
      customers.customers[0].firstName,
      customers.customers[0].lastName,
      customers.customers[0].postalCode,
    );
    await checkoutStepOnePage.continue();
    await checkoutStepTwoPage.expectStepTwoLoaded();
    await checkoutStepTwoPage.finish();
    await checkoutConfirmationPage.expectConfirmationLoaded();
    await checkoutConfirmationPage.checkHeaderMessage(
      checkoutMessages.checkout.headerMessage,
    );
    await checkoutConfirmationPage.checkDetailsMessage(
      checkoutMessages.checkout.detailsMessage,
    );
  });

  test("should show error when first name is missing", async ({
    checkoutStepOnePage,
  }) => {
    await checkoutStepOnePage.fillForm(
      "",
      customers.customers[0].lastName,
      customers.customers[0].postalCode,
    );
    await checkoutStepOnePage.continue();
    await checkoutStepOnePage.checkErrorMessage(
      checkoutMessages.checkout.missingFirstName,
    );
  });

  test("should show error when last name is missing", async ({
    checkoutStepOnePage,
  }) => {
    await checkoutStepOnePage.fillForm(
      customers.customers[0].firstName,
      "",
      customers.customers[0].postalCode,
    );
    await checkoutStepOnePage.continue();
    await checkoutStepOnePage.checkErrorMessage(
      checkoutMessages.checkout.missingLastName,
    );
  });

  test("should show error when postal code is missing", async ({
    checkoutStepOnePage,
  }) => {
    await checkoutStepOnePage.fillForm(
      customers.customers[0].firstName,
      customers.customers[0].lastName,
      "",
    );
    await checkoutStepOnePage.continue();
    await checkoutStepOnePage.checkErrorMessage(
      checkoutMessages.checkout.missingPostalCode,
    );
  });

  test("should cancel checkout and return to cart", async ({
    checkoutStepOnePage,
    cartPage,
  }) => {
    await checkoutStepOnePage.cancel();
    await cartPage.expectLoaded();
  });

  test("should display correct item in order summary", async ({
    checkoutStepOnePage,
    checkoutStepTwoPage,
  }) => {
    await checkoutStepOnePage.fillForm(
      customers.customers[0].firstName,
      customers.customers[0].lastName,
      customers.customers[0].postalCode,
    );
    await checkoutStepOnePage.continue();
    await checkoutStepTwoPage.expectStepTwoLoaded();
    await checkoutStepTwoPage.checkProductNameInSummary(
      products.products[0].name,
    );
    await checkoutStepTwoPage.checkProductDescriptionInSummary(
      products.products[0].description,
    );
    await checkoutStepTwoPage.checkProductPriceInSummary(
      products.products[0].price,
    );
    await checkoutStepTwoPage.checkProductTaxInSummary(
      products.products[0].tax,
    );
    await checkoutStepTwoPage.checkProductTotalInSummary(
      products.products[0].total,
    );
  });
});
