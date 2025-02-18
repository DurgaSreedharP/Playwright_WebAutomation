const { expect, test } = require("@playwright/test");
const PaymentPage = require("../Utilities/PaymentPageUAT");
const loginPage = require("../Utilities/loginPageUAT");
const getConnection = require("../Utilities/connectToDB");
const mssql = require("mssql");
const userCreds = require("../Utilities/PaymentsData");
const baseUrl = "https://www-uat.grays.com/lot/";
const { getLotNumber } = require("../Utilities/Lotquery");
const bidPage = require("../Utilities/BidPage");
const paymentsData = require("../Utilities/PaymentsData");
import { allure } from "allure-playwright";

test.beforeEach("Get lot number and signIn", async ({ page }) => {
  const lotNumber = await getLotNumber();
  const targetUrl = baseUrl + lotNumber;
  const paymentPage = new PaymentPage(page);
  const Loginpage = new loginPage(page);
  await page.goto(targetUrl);
  await Loginpage.LoginIntoGrays(
    userCreds.TestUserPayments,
    userCreds.password
  );
});

test("Verifying user Updating Payment method through confirmbid payment link", async ({ page }) => {
  const BidPage = new bidPage(page);
  await BidPage.navigateToConfirmBid();
  const paymentPage = new PaymentPage(page);
  await paymentPage.enterPaymentDetailsConfirmBid(
    paymentsData.creditCard,
    paymentsData.expiryDate,
    paymentsData.cvv,
    paymentsData.authentication
  );
  await allure.attachment("search-results.png", await page.screenshot(), {
    contentType: "image/png",
  });

  await expect(paymentPage.PaymentCardHolder).toContainText(
    paymentsData.creditCardNumberEndingin
  );
  await expect(paymentPage.cardPlaceHolderonConfirmBid).toContainText(
    paymentsData.CreditCardDetailsonConfirmBid,
    { timeout: 600000 }
  );
  await allure.attachment(
    "full-page-screenshot.png",
    await page.screenshot({ fullPage: true }),
    {
      contentType: "image/png",
    }
  );
  await page.getByRole('button', { name: 'Place Bid' }).click();
});
