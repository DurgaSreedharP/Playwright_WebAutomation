import { test, expect } from "@playwright/test";
const PaymentPage = require("../Utilities/PaymentPageUAT");
const loginPage = require("../Utilities/loginPageUAT");
const paymentsData = require("../Utilities/PaymentsData");
const userCreds = require("../Utilities/PaymentsData");
import { allure } from "allure-playwright";
const baseUrl='https://www-uat.grays.com/'

const { updateUserVerifyStatus } = require("../Utilities/NewEmailQuery");

const yourDetails = require("../Utilities/yourdetailspage");

const dataYourdetails = require("../Utilities/dataYourDetails");

test.beforeEach(async ({ page }) => {
  const today = new Date();
  const formattedDate = today.toISOString().replace(/[-T:.]/g, "");
  const newEmail = "testergrays+" + formattedDate + "@gmail.com";
  await page.goto(baseUrl);
  const yourdetails = new yourDetails(page);
  await yourdetails.createNewUser(
    page,
    newEmail,
    dataYourdetails.newUserPassword,
    dataYourdetails.newFirstName,
    dataYourdetails.newLastName,
    dataYourdetails.newDateOfBirthDay,
    dataYourdetails.newDateOfBirthMonth,
    dataYourdetails.newDateOfBirthYear,
    dataYourdetails.newAddressStreet,
    dataYourdetails.newAddressSuburb,
    dataYourdetails.newAddressPostcode,
    dataYourdetails.newAddressState,
    dataYourdetails.newPhoneNumber
  );
  await updateUserVerifyStatus(newEmail);
  const paymentPage = new PaymentPage(page);
  await paymentPage.MyProfile();
  await paymentPage.PaymentTab();
});

test("TC:1 Verify user trying to add InvalidCard details", async ({ page }) => {
  const paymentPage = new PaymentPage(page);
  await paymentPage.enterInvalidPaymentDetails();

  await expect(paymentPage.InvalidCardPopup).toContainText(
    userCreds.InvalidCardText
  );
  await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });
});

test("TC:2 Verify user adding a valid Credit card details", async ({ page }) => {
  const paymentPage = new PaymentPage(page);
  await paymentPage.enterPaymentDetails(
    paymentsData.creditCard,
    paymentsData.expiryDate,
    paymentsData.cvv,
    paymentsData.authentication
  );
  await expect(paymentPage.PaymentCardHolder).toContainText(
    userCreds.creditCardNumberEndingin
  );
 await page.reload();
  await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });
});

test("TC:3 Verify user adding a valid Debit card details", async ({ page }) => {
  const paymentPage = new PaymentPage(page);
  await paymentPage.enterPaymentDetails(
    paymentsData.debitCard,
    paymentsData.expiryDate,
    paymentsData.cvv,
    paymentsData.authentication
  );
  await expect(paymentPage.debitCardPlaceHolder).toContainText(
    userCreds.debitCardText,
    { timeout: 100000 }
  );
  await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });
});
test.afterEach(async ({ page }) => {
  const Loginpage = new loginPage(page);
  await Loginpage.logOutUat();
});
