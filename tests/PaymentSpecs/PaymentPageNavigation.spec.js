import { test, expect } from '@playwright/test';
const userCreds =require( '../Utilities/PaymentsData');
const PaymentPage= require('../Utilities/PaymentPageUAT');
const loginPage=require('../Utilities/loginPageUAT');
import { allure } from "allure-playwright";
const baseURL='https://www-uat.grays.com/signin'


test("Verify User Successfully navigated to payment Page ", async ({
  page,
}) => {
  await page.goto(baseURL);
  const Loginpage = new loginPage(page);
  const paymentPage = new PaymentPage(page);
  await Loginpage.LoginIntoUAT(userCreds.TestUser, userCreds.password);
  await paymentPage.PaymentPageExist();
  await expect(page).toHaveTitle("My Grays - Payment Details");
  await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });
});
test.afterEach(async ({ page }) => {
  const Loginpage = new loginPage(page);
  await Loginpage.logOutUat();
});