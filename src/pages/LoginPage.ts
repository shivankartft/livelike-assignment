import { expect, Locator, Page, test } from "@playwright/test";

export class Loginpage {
  page: Page;
  loginButton: Locator;
  loginEmailTextBox: Locator;
  loginPasswordTextBox: Locator;
  loginSubmitButton: Locator;
  logoutLink: Locator;
  invalidLoginMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = this.page.locator('a[href="/login"]');
    this.loginEmailTextBox = this.page.locator('form[action="/login"] input[type="email"]');
    this.loginPasswordTextBox = this.page.locator('form[action="/login"] input[type="password"]');
    this.loginSubmitButton = this.page.locator('form[action="/login"] button[type="submit"]');
    this.logoutLink = this.page.locator('[href="/logout"]');
    this.invalidLoginMessage = this.page.locator('form[action="/login"] p');
  }

  /**
   * Navigate to login link
   * @async
   * @returns {void}
   */
  async navigateToLoginPage() {
    await test.step(`Navigate to login page`, async () => {
      await this.page.goto("/login");
    });
  }

  /**
   * Input login details
   *
   * @async
   * @param {string} email - user email
   * @param {string} password - user password
   * @returns {void}
   */
  async inputLoginDetailsAndLogin(email: string, password: string) {
    await test.step(`Input logon details`, async () => {
      await this.loginEmailTextBox.waitFor({ state: "visible" });
      await this.loginEmailTextBox.fill(email);
      await this.loginPasswordTextBox.fill(password);
      await this.loginSubmitButton.click();
    });
  }

  /**
   * Verify login is successfull
   *
   * @async
   * @returns {void}
   */
  async verifySuccessfullLogin() {
    await test.step(`Verify successfull login`, async () => {
      await this.logoutLink.waitFor({ state: "visible" });
      await expect(this.logoutLink).toBeVisible();
    });
  }

  /**
   * Verify login is invalid
   *
   * @async
   * @returns {void}
   */
  async verifyInvalidLogin() {
    await test.step(`Verify invalid login`, async () => {
      await expect(this.loginButton).toBeVisible();
    });
  }
}
