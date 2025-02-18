const { expect, test } = require("@playwright/test");
const PaymentPage = require("../Utilities/PaymentPageUAT");
const loginPage = require("../Utilities/loginPageUAT");
const getConnection = require("../Utilities/connectToDB");
const mssql = require("mssql");
const userCreds = require("../Utilities/PaymentsData");
const baseUrl = "https://www-uat.grays.com/lot/";
const { getLotNumber, getLotNumberAutoOutBid } = require("../Utilities/Lotquery");
const bidPage = require("../Utilities/BidPage");
import { allure } from "allure-playwright";
import Outbid from "../Utilities/OutbidPage";
const outbid = require("../Utilities/OutbidPage");
const BidData = require("../Utilities/BidData");

test("Verify user one places a Auto bid,User two gets OutBid with the same lot placing less than user one max bid", async ({ page }) => {
  const lotNumber = await getLotNumberAutoOutBid();
  const targetUrl = baseUrl + lotNumber;
  const Loginpage = new loginPage(page);
  await page.goto(targetUrl);
  await Loginpage.LoginIntoGrays(userCreds.TestUser, userCreds.password, {
    timeout: 30000,
  });
  await page.goto(targetUrl);
  const BidPage = new bidPage(page);
  await BidPage.autoBid(page,BidData.autoBidValue);
  await allure.attachment("search-results.png", await page.screenshot(), {
    contentType: "image/png",
  });
  await page.goto('https://www-uat.grays.com');
  await Loginpage.logOutUat();
  await Loginpage.LoginIntoGrays(userCreds.testUser2, userCreds.password, {
    timeout: 100000,
  });
  await page.goto(targetUrl, { timeout: 10000 });
  await BidPage.bid(page,BidData.OutBidTestValue);
  const outbid = new Outbid(page);
  await outbid.OutBid(page);
  await allure.attachment("search-results.png", await page.screenshot(), {
    contentType: "image/png",
  });

});
