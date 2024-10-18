import { expect, Page } from "@playwright/test";

export class ContactUsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  readonly contactUsLink = 'a[href="/contact_us"]';
  readonly contactUsNameTextBox = '#contact-us-form input[name="name"]';
  readonly contactUsEmailTextBox = '#contact-us-form input[type="email"]';
  readonly contactUsSubjectTextBox = '#contact-us-form input[name="subject"]';
  readonly contactUsMessageTextBox = "#message";
  readonly submitButton = 'input[type="submit"]';
  readonly fileUploadButton = 'input[type="file"]';
  readonly successMessage = ".contact-form .alert-success";

  async clickOnContactUsPageButton() {
    await this.page.goto("/");
    await this.page.locator(this.contactUsLink).click();
  }

  async fillContactUsForm(name: string, email: string, subject: string, message: string, filePath: string) {
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.contactUsNameTextBox).fill(name);
    await this.page.locator(this.contactUsEmailTextBox).fill(email);
    await this.page.locator(this.contactUsSubjectTextBox).fill(subject);
    await this.page.locator(this.contactUsMessageTextBox).fill(message);
    await this.page.setInputFiles(this.fileUploadButton, filePath);
  }

  async clickOnSubmitButton() {
    await this.page.locator(this.submitButton).click();
    // this.page.on('dialog', async dialog => {
    //   console.log('=============',dialog.defaultValue)
    //   await dialog.accept(); // Accept the alert
    // });
  }

  async verifySuccessMessage(message: string) {
    await this.page.waitForTimeout(1500000);
    console.log("==========", await this.page.locator(this.successMessage).textContent());
    expect(await this.page.locator(this.successMessage).textContent()).toBe(message);
  }
}
