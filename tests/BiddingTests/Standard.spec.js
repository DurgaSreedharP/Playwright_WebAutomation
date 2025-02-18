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
const BidData = require("../Utilities/BidData");
import { allure } from "allure-playwright";

test.beforeEach("Get lot number and signIn", async ({ page }) => {
  const lotNumber = await getLotNumber();
  const targetUrl = baseUrl + lotNumber;
  const Loginpage = new loginPage(page);
  await page.goto(targetUrl);
  await Loginpage.LoginIntoGrays(userCreds.TestUser, userCreds.password, {
    timeout: 30000,
  });
  await page.goto(targetUrl);
});

test("Verify User places a standardbid and lands on bid successfull page", async ({ page }) => {
  const BidPage = new bidPage(page);
  await BidPage.bid(page, BidData.standardbidValue);
  const bidPriceTable=await BidPage.bidPrice.textContent();
  expect(bidPriceTable).toContain(BidData.StandardBidonBidSuccessfullPage);
  await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });

});



test("Verify invalid bid amount", async ({ page }) => {
  const BidPage = new bidPage(page);
  await BidPage.Invalidbid(page);
  await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });
});

test.afterEach(async ({ page }) => {
  const Loginpage = new loginPage(page);
  await Loginpage.logOutUat();
  console.log("logged out successfully");
});
