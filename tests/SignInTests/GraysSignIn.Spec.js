const { expect, test } = require("@playwright/test");
const loginPage = require("../Utilities/loginPageUAT");
const userCreds = require("../Utilities/PaymentsData");
const baseUrl = "https://www-uat.grays.com";
const DisplayError='This field is required';
const DisplayErrorInvalidLoginAttempt='Your login attempt was not successful. Please note your password is case sensitive. Try again or would you like to reset your password?'

import { allure } from "allure-playwright";

class loginPageTest {
  constructor(page) {
    this.emailInput = page.locator('#modal-root').getByPlaceholder('Email Address');
    this.passwordInput = page.getByPlaceholder("Enter your password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.title = page.locator(".sc-jaskfy > a");
    this.myProfile = page.getByText("My Profile");
    this.logOut = page.getByText("Sign Out", { exact: true });
    this.emailModal =  page.locator('#modal-root').getByPlaceholder('Email Address');
    this.passwordModal = page.getByPlaceholder("Password");
    this.SignIn = page.getByRole("button", { name: "Sign In / Register" });
    this.SignInXpath = page.locator("text=Sign In");
    this.SignIntitle = page.getByRole("heading", { name: "Sign In" });
    this.errorMessage = page.getByText("Your login attempt was not");
    this.emailRequiredErrormsg = page.getByText("This field is required");
  }
}

test.beforeEach(" Go to Grays", async ({ page }) => {
  await page.goto(baseUrl);
});
test("TC:1 Verify Login with Registered emailid and password", async ({ page }) => {
  const LoginPage = new loginPageTest(page);

  await LoginPage.SignIn.click();
  await LoginPage.emailModal.fill(userCreds.TestUser);
  await LoginPage.passwordModal.fill(userCreds.password);
  await LoginPage.loginButton.click();
  await expect(LoginPage.myProfile).toBeVisible({timeout:100000});
  await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });
});
test("TC:2 Verify Login with Unregistered emailId and password", async ({ page }) => {
  const LoginPage = new loginPageTest(page);
  await LoginPage.SignIn.click();
  await LoginPage.emailModal.fill(userCreds.InvalidUserEmail);
  await LoginPage.passwordModal.fill(userCreds.InvalidPassword);
  await LoginPage.loginButton.click();
  const errorMsg = await LoginPage.errorMessage.textContent();
  await expect(errorMsg).toEqual(
    DisplayErrorInvalidLoginAttempt,
    { timeout: 60000 }
  );
  await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });
  console.log("Error message:", errorMsg); 
});
test("TC:3 Verify Login Leaving email address and entering password ", async ({ page }) => {
  const LoginPage = new loginPageTest(page);
  await LoginPage.SignIn.click();

  await LoginPage.passwordModal.fill(userCreds.password);
  await LoginPage.emailModal.click();
  await LoginPage.emailModal.press("Tab");
  const emailErrorMsg = await LoginPage.emailRequiredErrormsg.textContent();
  await expect(emailErrorMsg).toEqual(DisplayError, {
    timeout: 60000,
  });
 await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });
  console.log("Error message:", emailErrorMsg);
});
test("TC:4 Verify Login Leaving password and entering email ", async ({ page }) => {
  const LoginPage = new loginPageTest(page);
  await LoginPage.SignIn.click();
  await LoginPage.emailModal.fill(userCreds.TestUser);
  await LoginPage.passwordModal.click();
  await LoginPage.passwordModal.press("Tab");
  const passwordErrorMsg = await LoginPage.emailRequiredErrormsg.textContent();
  await expect(passwordErrorMsg).toEqual(DisplayError, {
    timeout: 60000,
  });
   await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });
console.log("Error message:", passwordErrorMsg);
});
