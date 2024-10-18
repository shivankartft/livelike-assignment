import { Page, test } from "@playwright/test";

export class ProductsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  readonly searchBox = "#advertisement #search_product";
  readonly searchButton = "#advertisement #submit_search";
  readonly searchResults = '.features_items > div:not([id="cartModal"])';
  readonly loginSubmitButton = 'form[action="/login"] button[type="submit"]';
  readonly addToCartButton = ".productinfo .add-to-cart";

  async navigateToProductsPage() {
    await test.step(`Navigate to products page`, async () => {
      await this.page.goto("/products");
    });
  }

  async searchForAItem() {
    await test.step(`Search for a item`, async () => {
      await this.page.waitForTimeout(3000);
      await this.page.locator(this.searchBox).fill("shirt");
      await this.page.locator(this.searchButton).click();
    });
  }

  async selectLastThirdSearchResult() {
    await test.step(`Select last third item`, async () => {
      await this.page.waitForTimeout(2000);
      const searchResults = await this.page.locator(this.searchResults);
      const searchResultSelect = searchResults.nth((await searchResults.count()) - 3);
      await searchResultSelect.scrollIntoViewIfNeeded();
      await searchResultSelect.hover();
      searchResultSelect.locator(this.addToCartButton).click();
    });
  }
}
