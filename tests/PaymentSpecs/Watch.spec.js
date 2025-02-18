import { test, expect } from '@playwright/test';
const watchPage= require ('../Utilities/watchPage');
const loginPage = require("../Utilities/loginPageUAT");
const userCreds=require("../Utilities/PaymentsData");
const BaseUrl='https://www-uat.grays.com/'
const WatchUrl='https://www-uat.grays.com/mygrays/auctions/watching.aspx'
import { allure } from "allure-playwright";

test('navigate to watching', async ({ page }) => {
   await page.goto(BaseUrl);
  const Loginpage = new loginPage(page);
  await Loginpage.LoginIntoGrays(userCreds.TestUser, userCreds.password, {
    timeout: 30000,
  });
  const WatchPage=new watchPage(page);
  await WatchPage.navigatetoWatchTab();
  await expect (page).toHaveURL(WatchUrl);
  await allure.attachment("full-page-screenshot.png", await page.screenshot({fullPage: true}), {
    contentType: "image/png",
  });
  
});