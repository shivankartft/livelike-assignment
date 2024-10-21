import { test } from "../fixtures/fixture";
import { userDetails, successMessages } from "../testdata/testdata.json";

test.describe("Contact us form filling", () => {
  test(`Contact us form filling`, async ({ page, logger }) => {
    await page.contactUsPage.clickOnContactUsPageButton();
    logger.info("Successfully clicked on contact us page");

    await page.contactUsPage.fillContactUsForm(userDetails);
    logger.info("Successfully filled contact us form");

    await page.contactUsPage.submitButton.click();
    logger.info("Successfully clicked on submit button");

    await page.contactUsPage.verifySuccessMessage(successMessages.contactUsPage);
    logger.info("Successfully submitted the contact us form");
  });
});
