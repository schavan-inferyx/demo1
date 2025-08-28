export class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = this.page.getByRole("textbox", { name: "User Name" });
    this.passwordInput = this.page.getByRole("textbox", { name: "Password" });
    this.loginButton = this.page.locator("(//span[contains(text(),'Login')])[1]");
    this.profileMenu = this.page.locator("app-topbar i:nth-child(4)");
    this.logoutButton = this.page.getByRole("cell", { name: "Logout" });
    this.platformTitle = this.page.getByText("Inferyx System Admin Platform");
    this.errorMessage = this.page.locator(".error-message, .alert-danger");
  }
}
