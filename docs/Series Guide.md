# serial.spec.js


import { test } from "@playwright/test";

# test.describe.configure({ mode: "serial" }); 

test("test 1", async ({ page }) => { /* ... */ });
test("test 2", async ({ page }) => { /* ... */ });


# 1. Screenshot of the entire page

import { test } from "@playwright/test";

test("full page screenshot", async ({ page }) => {
  await page.goto("https://example.com");
 #  await page.screenshot({ path: "fullpage.png", fullPage: true });
});


# 2. Screenshot of a specific element

import { test } from "@playwright/test";

test("element screenshot", async ({ page }) => {
  await page.goto("https://example.com");
  # const logo = await page.locator("img#logo"); // element locator
  # await logo.screenshot({ path: "logo.png" });
});


# Allure Report Integration 

npm install -D allure-commandline
or 
npm install -g allure-commandline


allure --version
or 
npx allure --version

-- genrate report --
npx allure generate allure-results --clean -o allure-report

npx allure open allure-report
or
npx serve allure-report





