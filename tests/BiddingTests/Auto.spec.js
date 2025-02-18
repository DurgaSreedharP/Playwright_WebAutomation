const { expect, test } = require("@playwright/test");
const PaymentPage = require("../Utilities/PaymentPageUAT");
const loginPage = require("../Utilities/loginPageUAT");
const getConnection = require("../Utilities/connectToDB");
const mssql = require("mssql");
const userCreds = require("../Utilities/PaymentsData");
const baseUrl = "https://www-uat.grays.com/lot/";
const { getLotNumber, getLotNumberAuto } = require("../Utilities/Lotquery");
const bidPage = require("../Utilities/BidPage");
const paymentsData = require("../Utilities/PaymentsData");
import { allure } from "allure-playwright";
const bidData=require("../Utilities/BidData");


test.beforeEach("Get lot number and signIn", async ({ page }) => {
  const lotNumber = await getLotNumberAuto();
  const targetUrl = baseUrl + lotNumber;
  const Loginpage = new loginPage(page);
  await page.goto(targetUrl);
  await Loginpage.LoginIntoGrays(userCreds.TestUser, userCreds.password, {
    timeout: 30000,
  });
  await page.goto(targetUrl);
});
test("Verify User places Auto bid and lands on bid successfull page", async ({ page }) => {
  const BidPage = new bidPage(page);
  await BidPage.autoBid(page,bidData.autoBidValue);
  await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });
  const Loginpage = new loginPage(page);
  await Loginpage.logOutUat();

});
