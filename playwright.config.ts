import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(".env") });

export default defineConfig({
  testDir: "./src/tests",
  timeout: 3 * 60 * 1000,
  expect: {
    timeout: 60 * 1000,
  },
  workers: process.env.CI ? 1 : 7,
  reporter: "allure-playwright",
  use: {
    baseURL: "https://automationexercise.com",
    headless: false,
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
});
