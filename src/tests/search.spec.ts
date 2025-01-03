import { test } from "../fixtures/fixture";

test.describe("Search for a product and select last third result", () => {
  test(`Search for a product and select last third result`, async ({ page, logger }) => {
    await page.productsPage.navigateToProductsPage();
    logger.info("Successfully navigated to products page");

    await page.productsPage.searchForAItem("shirt");
    logger.info("Successfully search for shirt");

    await page.productsPage.selectLastNthSearchResult(3);
    logger.info("Successfully added the third item to cart");
  });
});
