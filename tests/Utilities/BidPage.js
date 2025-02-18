
const { expect, test } = require("@playwright/test");
const bidData = require("./BidData");
class bidPage {
  constructor(page) {
    this.standardBidButton = page.getByText("Standard", { exact: true },{timeout:60000});
   this.autoBidButton = page.locator("label").filter({ hasText: "Autobid" },{timeout:60000});
    this.placeBid = page.getByRole("button", { name: "Place Bid" },{timeout:60000});
    this.payWith = page
      .locator("span")
      .filter({ hasText: "Pay WithEdit" })
      .getByRole("link");
    this.confirmBidTitle = page.getByRole("heading", { name: "Confirm Bid" },{timeout:60000});
    this.bidSuccessfull = page.getByRole("heading", { name: "Bid Successful" });
    this.winningBid = page.getByText("Your current winning bid is AU $");
    this.currentBidPrice = page.getByText("$9", { exact: true });
    this.priceInput = page.locator("id=price",{timeout:60000});
    this.priceEnter = page.locator("id=priceValue");
    this.errorEnterMore = page.getByText("Enter $9 or more");
    this.currentBidSuccessfullPage = page.getByText(
      "Your current winning bid is AU $"
    );
    this.winningPrice = page.getByRole('table').getByText('$15');
   //this.winningPrice=page.locator()
    this.winningPriceStandard = page.getByRole("table").getByText("$55");
    this.nextIncrement = page.locator("id=dvBidHelpText");
    this.validationErrorBidPrice = page.locator("id=bidAlertErrMsg",{timeout:60000});
    this.bidPrice=page
    .getByRole("table")
    .getByText("AU $55");
    this.UsertwoBidPrice=page
    .getByRole("table")
    .getByText("AU $65");
    this.CurrentBIdOnOutBidNotif=page.getByText('Current Winning Bid', { exact: true });
    this.BidValueOnOutbidNotif=page.locator('#ol20786892').getByText('AU $',{timeout:60000});
  }
  async navigateToConfirmBid() {
    this.placeBid.click();
    this.payWith.click();
    return this.navigateToConfirmBid;
  }

 
  async bid(page, bidValue) {
  await  this.priceInput.fill(bidValue, { timeout: 60000 });
    const hiddenFieldName = "priceValue";
    const newValue = bidValue; 
    await page.evaluate(
      (fieldName, value) => {
        const element = document.getElementById(fieldName);
        console.log("Found element:", element);
        if (element) {
          element.value = value;

          console.log("Updated value to:", value);
        }
      },
      { fieldName: hiddenFieldName, value: newValue }
    );
    await expect(this.standardBidButton).toBeVisible();
   await this.standardBidButton.click();
    await this.placeBid.focus();
    this.placeBid.click();
    await expect(this.confirmBidTitle).toContainText("Confirm Bid"
);
    this.placeBid.click();

    return this.bid;
  }

  async Invalidbid(page) {
  await  this.priceInput.click();
   await this.priceInput.fill(bidData.invalidBidAmount);
    const hiddenFieldName = "priceValue";
    const newValue = bidData.invalidBidAmount; 
    await page.evaluate(
      (fieldName, value) => {
        const element = document.getElementById(fieldName);
        console.log("Found element:", element);
        if (element) {
          element.value = value;

          console.log("Updated value to:", value);
        }
      },
      { fieldName: hiddenFieldName, value: newValue }
    );
    try{
    await this.placeBid.click();
    await this.validationErrorBidPrice.focus();
   const err= await this.validationErrorBidPrice.textContent();
    await expect(this.validationErrorBidPrice).toContainText(
      "Enter $9 or more"
    );
    console.log(err);
    return this.Invalidbid;}
    catch(error){
console.log(error);
    }
  }

  async autoBid(page, autoBidValue) {
    await this.priceInput.click();
   await this.priceInput.fill(autoBidValue, { timeout: 600000 });
    const hiddenFieldName = "priceValue";
    const newValue = autoBidValue;
    await page.evaluate(
      (fieldName, value) => {
        const element = document.getElementById(fieldName);
        console.log("Found element:", element);
        if (element) {
          element.value = value;

          console.log("Updated value to:", value);
        }
      },
      { fieldName: hiddenFieldName, value: newValue }
    );
   
   await this.autoBidButton.click();
    await this.placeBid.focus();
  await  this.placeBid.click();

    await expect(this.confirmBidTitle).toContainText("Confirm Bid" );
    this.placeBid.click();
    const bidPrice = await this.winningPrice.textContent();
    console.log(bidPrice);
    expect(bidPrice).toContain("AU $15");
  }
  
}
module.exports = bidPage;