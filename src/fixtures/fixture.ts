import { test as base, chromium, Page, TestInfo } from "@playwright/test";
import { BasePage } from "src/pages/BasePage";
import CustomLogger from "../../logger";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config({ path: path.resolve(".env") });
const environment = (process.env.EXECUTION_ENV || "local").toLowerCase();

type ExtendedPage = BasePage["page"];

const test = base.extend<{ page: ExtendedPage; logger: CustomLogger }>({
  // Define the logger fixture
  // eslint-disable-next-line
  logger: async ({}, use, testInfo) => {
    const globalTestFileName = path.basename(testInfo.file, ".ts");
    const logger = new CustomLogger(globalTestFileName);
    await use(logger); // Provide logger to the test context
  },

  // Define the page fixture with logger integration
  page: async ({ logger }, use, testInfo) => {
    const browserOptions = { headless: process.env.HEADLESS_MODE === "true" };
    const browser = await chromium.launch(browserOptions);
    const context = await browser.newContext();
    const page = await context.newPage();
    const basePage = new BasePage(page);

    // Use logger to log test actions
    logger.info(`Starting test: ${testInfo.title}`);

    try {
      await use(basePage.page);
    } finally {
      if (environment === "local" && ["failed", "timedOut", "interrupted"].includes(testInfo.status!)) {
        logger.error(`Test "${testInfo.title}" failed or was interrupted.`);
        try {
          await attachVideo(testInfo, page);
          await attachScreenshot(testInfo, page);
        } catch (error) {
          console.error("Error attaching video and screenshot in local environment: ", error);
        }
      } else {
        logger.info(`Test "${testInfo.title}" passed.`);
      }
      const logFilePath = `logs/${path.basename(testInfo.file, ".ts")}.log`;

      // Check if the log file exists before attaching
      if (fs.existsSync(logFilePath)) {
        // Read the log file content
        const logContent = fs.readFileSync(logFilePath, "utf-8");

        // Attach the log file to Allure using testInfo
        await testInfo.attach(logFilePath, {
          contentType: "text/plain",
          body: logContent,
        });
      } else {
        logger.warn(`Log file not found: ${logFilePath}`);
      }
    }

    await context.close();
    await browser.close();
  },
});

/**
 * Attahced the video to allure report if test fails
 *
 * @async
 * @param {TestInfo} testInfo - test info object
 * @param {Page} page - page object
 * @returns {void}
 */
async function attachVideo(testInfo: TestInfo, page: Page) {
  const video = await page.video()?.path(); // Get video file path
  if (video) {
    await testInfo.attach("Video", {
      path: video,
      contentType: "video/webm",
    });
  }
}

/**
 * Attaches screenshot to allure report if test fails
 * @async
 * @param {TestInfo} testInfo - test info object
 * @param {Page} page - page object
 * @returns {void}
 */
async function attachScreenshot(testInfo: TestInfo, page: Page) {
  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png",
  });
}

export { test };
