const { expect, test } = require("@playwright/test");
const PaymentPage = require("../Utilities/PaymentPageUAT");
const loginPage = require("../Utilities/loginPageUAT");
const getConnection = require("../Utilities/connectToDB");
const mssql = require("mssql");
const userCreds = require("../Utilities/PaymentsData");
const baseUrl = "https://www-uat.grays.com/lot/";
const { getLotNumber, getLotNumberAutoOutBid } = require("../Utilities/Lotquery");
const bidPage = require("../Utilities/BidPage");
const paymentsData = require("../Utilities/PaymentsData");
const BidData = require("../Utilities/BidData");
import { allure } from "allure-playwright";



test("Verify User one  places a standardbid and User two places a higher bid, user one gets  outbid notification", async ({ page }) => {
  
  const lotNumber = await getLotNumberAutoOutBid();
  const targetUrl = baseUrl + lotNumber;
  const Loginpage = new loginPage(page);
  await page.goto(targetUrl);
  await Loginpage.LoginIntoGrays(userCreds.TestUser, userCreds.password, {
    timeout: 30000,
  });
  await page.goto(targetUrl);
  const BidPage = new bidPage(page);
  await BidPage.bid(page, BidData.standardbidValue);
  const bidPriceTable=await BidPage.bidPrice.textContent();
  expect(bidPriceTable).toContain(BidData.StandardBidonBidSuccessfullPage);
  await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });
  await Loginpage.logOutUat();
  await Loginpage.LoginIntoUAT(userCreds.testUser2, userCreds.password, {
    timeout: 30000,
  });
  await page.goto(targetUrl);
  await BidPage.bid(page, BidData.UserTwoBidValue);
  const bidPriceTableUsertwo=await BidPage.UsertwoBidPrice.textContent();
  expect(bidPriceTableUsertwo).toContain(BidData.StandardBidonBidSuccessfullPageUsertwo);
  await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });
  await Loginpage.logOutUat();
  await Loginpage.LoginIntoUAT(userCreds.TestUser, userCreds.password, {
    timeout: 100000,
  });
  await page.goto(targetUrl);
  await page.getByRole('link', { name: 'You\'ve Been Outbid' }).click({timeout:100000});
  await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });
 
});

