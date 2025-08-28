/**
 * Organization Page Object - Contains only locators as properties
 * Actions are performed in test cases using these locators
 *
 * COPY-PASTE PATTERN:
 * 1. From recorded test: await page.getByRole('textbox', { name: 'User Name' }).click()
 * 2. Copy locator part: page.getByRole('textbox', { name: 'User Name' })
 * 3. Add to page object: userNameTextbox = this.page.getByRole('textbox', { name: 'User Name' })
 * 4. Use in test: await organizationPage.userNameTextbox.click()
 */
export class Organization {
  constructor(page) {
    this.page = page;
    this.adminApplication = this.page.locator("//div[@title='Inferyx System Admin']")
    this.domainInput = this.page.locator('div').filter({ hasText: /^Domain$/ }).getByRole('textbox')
    this.firstNameInput = this.page.locator('tr').filter({ hasText: 'ASSOCIATE' }).getByRole('textbox').first()
    this.phoneInput = this.page.getByRole('row', { name: 'dropdown trigger demo' }).getByRole('textbox').nth(1)
    this.emailInput = this.page.getByRole('row', { name: 'dropdown trigger demo' }).getByRole('textbox').nth(2)
    this.secondFirstNameInput = this.page.getByRole('row', { name: 'dropdown trigger', exact: true }).getByRole('textbox').first()
    this.secondPhoneInput = this.page.getByRole('row', { name: 'dropdown trigger demo2' }).getByRole('textbox').nth(1)
    this.secondEmailInput = this.page.getByRole('row', { name: 'dropdown trigger demo2' }).getByRole('textbox').nth(2)
    this.screenshotButton = this.page.locator(".p-element[data-test-id='screenshot']")
    this.screenshotNameInput = this.page.locator('[data-test-id="screenshot-name"]')
    this.captureScreenshotButton = this.page.locator('[data-test-id="capture-screenshot"]')
    this.searchKeywordInput = this.page.locator("//input[@placeholder='Search Keyword']")
    this.platformAdministrationLink = this.page.getByText("Platform Administration");
    this.inferyxSystemAdminPlatformLink = this.page.getByText("Inferyx System Admin Platform");
    this.organizationLink = this.page.locator("//ul[@class='layout-menu']//li[3]"); 
    this.nameInput = this.page.locator("//input[@id='name']")
    this.nameTextbox = this.page.getByRole("textbox", { name: "Name *" });
    this.descriptionTextarea = this.page.locator('//textarea[@formcontrolname="desc"]')
    this.domainTextbox = this.page.locator("div:has-text('Domain') input[role='textbox']");
    this.searchKeywordTextbox = this.page.getByRole("textbox", {name: "Search Keyword",});
    this.submitButton = this.page.getByRole("button", { name: "Submit" });
    this.actionButton = this.page.getByRole("button", { name: "Action" });
    this.firstActionButton = this.page.locator('(//button[@label="Action"][1])[1]')
    this.closeButton = this.page.getByRole("button", { name: "Close" });
    this.okButton = this.page.getByRole("button", { name: "Ok" });
    this.multiSelectDropdown = this.page.locator("(//div[@class='p-multiselect-trigger'])[1]");
    this.secondMultiSelectDropdown = this.page.locator("(//div[@class='p-multiselect-trigger'])[2]");
    this.test1Option = this.page.getByRole('option', { name:'test_1'}).locator('div').nth(1);
    this.resourceHighOption = this.page.getByRole("option", { name: "resource_high" }).locator("div:nth-child(2)");
    this.resourceMedOption = this.page.getByRole("option", { name: "resource_med" }).locator("div:nth-child(2)");
    this.test1OptionFirstChild = this.page.locator('div').filter({ hasText: /^test_1$/ }).first();
    this.contactTabpanel = this.page.getByRole("tabpanel", { name: "Contact" });
    this.addContactButton = this.page.getByRole("tabpanel", { name: "Contact" }).getByRole("button").first();
    this.roleDropdown = this.page.locator("(//div[@aria-label='dropdown trigger'])[2]")
    this.roleSearchbox = this.page.getByRole("searchbox");
    this.associateOption = this.page.getByText("ASSOCIATE");
    this.directorOption = this.page.getByRole("option", { name: "DIRECTOR" });
    this.firstNameTextbox = this.page.locator("tr:has-text('ASSOCIATE') input[role='textbox']:first-child");
    this.phoneTextbox = this.page.locator("tr:has-text('ASSOCIATE') input[role='textbox']:nth-child(2)");
    this.emailTextbox = this.page.locator("tr:has-text('ASSOCIATE') input[role='textbox']:nth-child(3)");
    this.secondRoleDropdown = this.page.locator("(//div[@aria-label='dropdown trigger'])[3]")
    this.secondFirstNameTextbox = this.page.locator("tr:has-text('DIRECTOR') input[role='textbox']:first-child");
    this.secondPhoneTextbox = this.page.locator("tr:has-text('DIRECTOR') input[role='textbox']:nth-child(2)");
    this.secondEmailTextbox = this.page.locator("tr:has-text('DIRECTOR') input[role='textbox']:nth-child(3)");
    this.organizationRow = this.page.getByRole("row", {name: /Inferyx Inc Demo sys_admin/,});
    this.organizationActionButton = this.page.getByRole("row", { name: /Inferyx Inc Demo sys_admin/ }).getByRole("button");
    this.viewOption = this.page.getByText("View");
    this.editOption = this.page.getByText("Edit");
    this.lockOption = this.page.getByText("Lock");
    this.viewRowOption = this.page.getByRole("row", { name: /View/ });
    this.addButton = this.page.locator("//button[@icon='pi pi-plus']");
    this.calendarDiv = this.page.locator("div:has-text('Calendar') div:nth-child(2)");
    this.logoutRow = this.page.getByRole("row", { name: /Logout/ });
    this.logoutCell = this.page.getByRole("cell", { name: "Logout" });
    this.searchBox = this.page.getByRole('textbox', { name: 'Search Keyword' })
    this.deleteTextList = this.page.getByRole('row', { name: ' Delete' })

  }
}
