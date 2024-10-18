import { expect, Page, test } from "@playwright/test";

export class Loginpage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  readonly loginButton = 'a[href="/login"]';
  readonly loginEmailTextBox = 'form[action="/login"] input[type="email"]';
  readonly loginPasswordTextBox = 'form[action="/login"] input[type="password"]';
  readonly loginSubmitButton = 'form[action="/login"] button[type="submit"]';
  readonly logoutLink = '[href="/logout"]';

  async navigateToLoginPage() {
    await test.step(`Navigate to login page`, async () => {
      await this.page.goto("/login");
    });
  }

  async clickOnLoginButton() {
    await test.step(`Click on login link`, async () => {
      await this.page.waitForTimeout(3000);
      await this.page.locator(this.loginButton).click();
    });
  }

  async inputLoginDetailsAndLogin(email: string, password: string) {
    await test.step(`Input logon details`, async () => {
      await this.page.waitForTimeout(2000);
      await this.page.locator(this.loginEmailTextBox).fill(email);
      await this.page.locator(this.loginPasswordTextBox).fill(password);
      await this.page.locator(this.loginSubmitButton).click();
    });
  }

  async verifySuccessfullLogin() {
    await test.step(`Verifu successfull login`, async () => {
      const logoutLink = await this.page.locator(this.logoutLink);
      await logoutLink.waitFor({ state: "visible" });
      expect(await logoutLink.isVisible()).toBeTruthy;
    });
  }
}
