const { expect } = require("@playwright/test");

const PaymentsData = require("./PaymentsData");
class loginPage {
  constructor(page) {
    this.emailInput = page.getByPlaceholder("Enter your email address");
    this.passwordInput = page.getByPlaceholder("Enter your password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.title = page.locator(".sc-jaskfy > a");
    this.myProfile = page.getByText("My Profile");
    this.logOut = page.getByText("Sign Out", { exact: true });
    this.emailModal = page
      .locator("#modal-root", "#react-header")
      .getByPlaceholder("Email Address", { name: "email" });
    this.passwordModal = page.getByPlaceholder("Password");
    this.SignIn = page.getByRole("button", { name: "Sign In / Register" });
    this.SignInXpath = page.getByText("Sign In");
    this.SignIntitle = page.getByRole("heading", { name: "Sign In" });
  }

  async LoginIntoUAT(userName, password) {
    await this.emailInput.fill(userName, { timeout: 60000 });
    await this.passwordInput.fill(password);
    await this.loginButton.click({ timeout: 60000 });
    await expect(this.myProfile).toBeVisible();
  }

  async logOutUat() {
    
    await this.myProfile.click({ timeout: 180000 });
    await this.logOut.click();
    return this.logOutUat;
  }
  async LoginIntoGrays(userName, password) {
    await this.SignIn.click();
    await this.emailModal.fill(userName, { timeout: 60000 });
    await this.passwordModal.fill(password, { timeout: 60000 });
    await this.loginButton.click({ timeout: 30000 });
    await expect(this.myProfile).toBeVisible({ timeout: 30000 });
    return this.LoginIntoGrays;
  }
}

module.exports = loginPage;
