import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/Platform/Login/LoginPage.js";

export const test = base.extend({
  // Provide test credentials from environment
  username: [process.env.TEST_USERNAME || "sys_admin",{ option: true }],
  password: [process.env.TEST_PASSWORD || "20Inferyx!9", { option: true }],

  authentication: async ({ page, username, password }, use) => {
    const loginPage = new LoginPage(page);
    const loginUrl =process.env.LOGIN_URL || "https://dev.inferyx.com/admin/#/login";
    await page.goto(loginUrl);
    await loginPage.usernameInput.fill(username);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();
    await use(page);

    // Logout after test
    // try {
    //   await loginPage.profileMenu.click();
    //   await loginPage.logoutButton.click();
    // } catch (error) {
    //   console.log("Logout failed or already logged out:", error.message);
    // }
  },
});

export { expect } from "@playwright/test";
