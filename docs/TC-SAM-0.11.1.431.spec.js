import { test } from "../base/BaseTest.js";
import { Organization } from '../pages/administration/organization/Organization.js';
import { saveDownloadAs } from '../utils/saveDownload.js';


test.describe("Administration - Organization Module", () => {
  test("TC-SAM-0.11.1.431 : Delete", async ({authentication}   , testInfo) => {
    const page = authentication;
    const organizationPage = new Organization(page);

    //Select application
    await organizationPage.adminApplication.click();

    // Navigate to Organization section
    await organizationPage.organizationLink.click();

    await organizationPage.searchBox.click();
    await organizationPage.searchBox.fill('Inferyx Inc Demo');
    await page.waitForTimeout(3000)

    await organizationPage.firstActionButton.hover();
    await organizationPage.firstActionButton.click();
    await organizationPage.deleteTextList.click();
    await organizationPage.okButton.click();

    await organizationPage.screenshotButton.click();
    await organizationPage.screenshotNameInput.fill("TC-SAM-0.11.1.431");
    await saveDownloadAs(page, organizationPage.captureScreenshotButton, "TC-SAM-0.11.1.431")
    console.log("Full file path:", testInfo.file);


  });
});