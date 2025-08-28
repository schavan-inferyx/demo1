import { test } from "../../../base/BaseTest.js";
import { Organization } from "../../../pages/administration/organization/Organization.js";
import { saveDownloadAs } from "../../../utils/saveDownload.js";

test.describe("Administration - Organization Module", () => {
  test("TC-SAM-0.11.1.423 : Create New Organization with Contact Details", async ({authentication,}) => {
    const page = authentication;
    const organizationPage = new Organization(page);

    //Select application
    await organizationPage.adminApplication.click();

    // Navigate to Organization section
    await organizationPage.organizationLink.click();

    // Start creating new organization
    await organizationPage.addButton.click();

    // Fill organization basic details
    await organizationPage.nameInput.click();
    await organizationPage.nameInput.fill("Inferyx Inc Demo");
    await organizationPage.descriptionTextarea.click();
    await organizationPage.descriptionTextarea.fill("testing purpose");

    // Configure organization settings
    await organizationPage.multiSelectDropdown.click();
    await organizationPage.test1Option.click();
    await organizationPage.test1OptionFirstChild.click();

    await organizationPage.secondMultiSelectDropdown.click();
    // await organizationPage.closeButton.click();
    await organizationPage.domainInput.click();
    await organizationPage.domainInput.fill("Inferyx.com");

    // Add contact information
    await organizationPage.addContactButton.click();
    await organizationPage.addContactButton.click();

    // First contact - Associate
    await organizationPage.roleDropdown.click();
    await organizationPage.roleSearchbox.fill("Associate");
    await organizationPage.associateOption.click();
    await organizationPage.firstNameInput.click();
    await organizationPage.firstNameInput.fill("demo");
    await organizationPage.phoneInput.click();
    await organizationPage.phoneInput.fill("7020926466");
    await organizationPage.emailInput.click();
    await organizationPage.emailInput.fill("sdhomse@inferyx.com");

    // Second contact - Director
    await organizationPage.secondRoleDropdown.click();
    await organizationPage.roleSearchbox.fill("Director");
    await organizationPage.directorOption.click();
    await organizationPage.secondFirstNameInput.click();
    await organizationPage.secondFirstNameInput.fill("demo2");
    await organizationPage.secondPhoneInput.click();
    await organizationPage.secondPhoneInput.fill("9878765654");
    await organizationPage.secondEmailInput.click();
    await organizationPage.secondEmailInput.fill("demo@inferyx.com");

    // Submit organization creation
    await organizationPage.submitButton.click();
    await page.waitForTimeout(5000)

    // Capture screenshot for verification
    await organizationPage.screenshotButton.click();
    await organizationPage.screenshotNameInput.fill("TC-SAM-0.11.1.423");
    await saveDownloadAs(page, organizationPage.captureScreenshotButton, "TC-SAM-0.11.1.423")

  });
});
