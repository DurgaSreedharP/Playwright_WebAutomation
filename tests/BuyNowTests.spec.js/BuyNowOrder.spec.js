import { base } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
const buyNow=require('../Utilities/BuyNowPage');
const loginPage = require("../Utilities/loginPageUAT");
const userCreds = require("../Utilities/PaymentsData");
const baseUrl='https://www-uat.grays.com';

test.beforeEach("Get lot number and signIn", async ({ page }) => {

  await page.goto(baseUrl);
  const Loginpage = new loginPage(page);
 
  await Loginpage.LoginIntoGrays(userCreds.TestUser, userCreds.password, {
    timeout: 60000,
  });
})


test('Verify user places a buyNow order and lands on order successfull page', async ({ page }) => {
  const BuyNow= new buyNow(page);
  await BuyNow.addTocart(page);
  
});
