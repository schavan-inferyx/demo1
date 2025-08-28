import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : undefined,
  workers: 1,       // force single worker
  reporter: [["html"], ["list"], ["allure-playwright"]],
  use: {
    baseURL: process.env.BASE_URL || "https://dev.inferyx.com/admin/#/login",
    trace: "on",
    screenshot: {
      mode: "only-on-failure",
      fullPage: true,
    },
    video: {
      mode: "on",
      size: { width: 1920, height: 1080 },
    },
    headless: process.env.CI ? true : false,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    actionTimeout: 50000,
    navigationTimeout: 60000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],
  outputDir: "test-results/",
  globalTimeout: process.env.CI ? 60 * 60 * 1000 : undefined, // 1 hour for CI
  timeout: 50000,
  expect: {
    timeout: 10000,
  },
});
