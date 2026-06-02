import { BasePage } from "pages/BasePage";
import { changeViewPortToLandscape } from "../../utils/viewport.utils";
import { test, expect, VALID_USER, LOCKED_USER } from "../fixtures";

test.describe("Login", () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(VALID_USER.username, VALID_USER.password, "mobile");
    await inventoryPage.expectLoaded();
  });

  test("@mobile Mobile layout should display hamburger menu and Menu Wrap Hidden", async ({
    basePage,
  }) => {
    await basePage.checkMenuButtonIsVisible();
    await basePage.checkMenuWrapIsHidden();
  });

  test("@mobile Menu mobile should open and close correctly", async ({
    basePage,
  }) => {
    await basePage.openMenu("mobile");
    await basePage.checkMenuIsOpen();
    await basePage.closeMenu("mobile");
    await basePage.checkMenuWrapIsHidden();
  });

  test("@mobile Filter should not be visible", async ({
    basePage,
    inventoryPage,
  }) => {
    await basePage.openMenu("mobile");
    await basePage.checkMenuIsOpen();
    await inventoryPage.checkActiveOptionFilterIsHidden();
  });

  test("@mobile Products shelf adapted to mobile view", async ({
    inventoryPage,
  }) => {
    await inventoryPage.checkProductWidth();
  });

  test("@mobile Logo is centered", async ({ basePage }) => {
    await basePage.checkLogoIsCentered();
  });
  
  test("@mobile Change Viewport to Landscape and check if layout responds correctly", async ({
    page,
    inventoryPage,
  }) => {
    await changeViewPortToLandscape(page);
    await inventoryPage.checkFirstProductIsVisibleOnGrid();
  });

  test("@mobile Check Footer is not covering content", async ({
    page,
    inventoryPage,
  }) => {
    await inventoryPage.checkLastItemIsVisible();
  });
});
