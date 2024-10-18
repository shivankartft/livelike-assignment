import type { Page } from "@playwright/test";
import { Loginpage } from "src/pages/LoginPage";
import { ContactUsPage } from "src/pages/ContactUsPage";
import { ProductsPage } from "./ProductsPage";

declare module "@playwright/test" {
  interface Page {
    loginPage: Loginpage;
    contactUsPage: ContactUsPage;
    productsPage: ProductsPage;
  }
}

export class BasePage {
  constructor(public page: Page) {
    this.initializeComponents();
  }

  protected initializeComponents() {
    this.page.loginPage = new Loginpage(this.page);
    this.page.contactUsPage = new ContactUsPage(this.page);
    this.page.productsPage = new ProductsPage(this.page);
  }
}
