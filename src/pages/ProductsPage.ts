import { Locator, Page, test } from "@playwright/test";

export class ProductsPage {
  page: Page;
  searchBox: Locator;
  searchButton: Locator;
  searchResults: Locator;
  loginSubmitButton: Locator;
  addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = this.page.locator("#advertisement #search_product");
    this.searchButton = this.page.locator("#advertisement #submit_search");
    this.searchResults = this.page.locator('.features_items > div:not([id="cartModal"])');
    this.loginSubmitButton = this.page.locator('form[action="/login"] button[type="submit"]');
    this.addToCartButton = this.page.locator(".productinfo .add-to-cart");
  }

  /**
   * Navigate to products page
   *
   * @async
   * @returns {void}
   */
  async navigateToProductsPage() {
    await test.step(`Navigate to products page`, async () => {
      await this.page.goto("/products");
    });
  }

  /**
   * Search for a item
   *
   * @async
   * @param {string} searchTerm - item to be searched
   * @returns {void}
   */
  async searchForAItem(searchTerm: string) {
    await test.step(`Search for a item`, async () => {
      await this.searchBox.waitFor({ state: "visible" });
      await this.searchBox.fill(searchTerm);
      await this.searchButton.click();
    });
  }

  /**
   * select last nth result from search results
   *
   * @async
   * @param {number} searchNumber - last nth number to click from search results
   * @returns {void}
   */
  async selectLastNthSearchResult(searchNumber: number) {
    await test.step(`Select last third item`, async () => {
      const searchResultSelect = await this.searchResults.nth((await this.searchResults.count()) - searchNumber);
      await searchResultSelect.scrollIntoViewIfNeeded();
      await searchResultSelect.hover();
      await searchResultSelect.locator(this.addToCartButton).click();
    });
  }
}
