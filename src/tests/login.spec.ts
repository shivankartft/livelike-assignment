import { test } from "../fixtures/fixture";
import { login } from "../testdata/testdata.json";

test.describe("Login", () => {
  test(`Login`, async ({ page, logger }) => {
    await page.loginPage.navigateToLoginPage();
    logger.info("Successfully navigated to login page");

    await page.loginPage.clickOnLoginButton();
    logger.info("Successfully clicked on login button");

    await page.loginPage.inputLoginDetailsAndLogin(login.valid.email, login.valid.password);
    logger.info("Successfully entered user details and clicked on submit button");

    await page.loginPage.verifySuccessfullLogin();
    logger.info("Successfully logged in");
  });


  test(`Invalid Login`, async ({ page, logger }) => {
    await page.loginPage.navigateToLoginPage();
    logger.info("Successfully navigated to login page");

    await page.loginPage.clickOnLoginButton();
    logger.info("Successfully clicked on login button");

    await page.loginPage.inputLoginDetailsAndLogin(login.invalid.email, login.invalid.password);
    logger.info("Successfully entered user details and clicked on submit button");

    await page.loginPage.verifyInvalidLogin();
    logger.info("Successfully verified invalid login");
  });
});
