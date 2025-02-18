import { test, expect } from "@playwright/test";

import { allure } from "allure-playwright";

const { updateUserVerifyStatus } = require("../Utilities/NewEmailQuery");

const yourDetails = require("../Utilities/yourdetailspage");

const dataYourdetails = require("../Utilities/dataYourDetails");

test("test", async ({ page }) => {
  const today = new Date();
 const formattedDate = today.toISOString().replace(/[-T:.]/g, "");
const newEmail = "testergrays+" + formattedDate + "@gmail.com";
await page.goto("https://www-uat.grays.com/");
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
    //dataYourdetails.newPhoneNumber
  );
  console.log(newEmail);
  await expect(
    page.getByText("Changes saved successfully Your changes have been saved.")
  ).toBeVisible({ timeout: 10000 });
await updateUserVerifyStatus(newEmail);
5674211
await allure.attachment("search-results.png", await page.screenshot(), {
    contentType: "image/png",
  });
console.log("New user created successfully");
// await expect(
//     page.getByText("Changes saved successfully Your changes have been saved.")
//   ).toBeVisible({ timeout: 10000 });
await page.reload();
}); 

 