import { expect, Locator, Page, test } from "@playwright/test";

export class ContactUsPage {
  page: Page;
  contactUsLink: Locator;
  contactUsNameTextBox: Locator;
  contactUsEmailTextBox: Locator;
  contactUsSubjectTextBox: Locator;
  contactUsMessageTextBox: Locator;
  submitButton: Locator;
  fileUploadButton: Locator;
  successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactUsLink = this.page.locator('a[href="/contact_us"]');
    this.contactUsNameTextBox = this.page.locator('#contact-us-form input[name="name"]');
    this.contactUsEmailTextBox = this.page.locator('#contact-us-form input[type="email"]');
    this.contactUsSubjectTextBox = this.page.locator('#contact-us-form input[name="subject"]');
    this.contactUsMessageTextBox = this.page.locator("#message");
    this.submitButton = this.page.locator('input[type="submit"]');
    this.fileUploadButton = this.page.locator('input[type="file"]');
    this.successMessage = this.page.locator(".contact-form .alert-success");
  }

  /**
   * Click on contact us link on homepage
   * @async
   * @returns {void}
   */
  async clickOnContactUsPageButton() {
    await test.step(`Click on contact us page link`, async () => {
      await this.page.goto("/");
      await this.contactUsLink.click();
    });
  }

  /**
   * @typedef {Object} FormData
   * @property {string} name - The name of the user.
   * @property {string} email - The email of the user.
   * @property {string} subject - The subject of the message.
   * @property {string} message - The message content.
   * @property {string} filePath - The file path if an attachment is included.
   */

  /**
   * Fills the contact us page form.
   *
   * @async
   * @param {FormData} formData - User details for contact us form.
   * @returns {void}
   */
  async fillContactUsForm(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    filePath: string;
  }) {
    await test.step(`Fill contact us form`, async () => {
      await this.contactUsNameTextBox.waitFor({ state: "visible" });
      await this.contactUsNameTextBox.fill(formData.name);
      await this.contactUsEmailTextBox.fill(formData.email);
      await this.contactUsSubjectTextBox.fill(formData.subject);
      await this.contactUsMessageTextBox.fill(formData.message);
      await this.fileUploadButton.setInputFiles(formData.filePath);
    });
  }

  /**
   * Verifies the success message generated after submitting the contact us form
   *
   * @async
   * @param {string} message - success message
   * @returns {void}
   */
  async verifySuccessMessage(message: string) {
    await test.step(`Verify success message`, async () => {
      expect(this.successMessage.textContent()).toBe(message);
    });
  }
}
