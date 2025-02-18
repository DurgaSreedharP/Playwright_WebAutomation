
const { expect, test } = require("@playwright/test");

class Outbid {
  constructor(page) {
    this.outBidNotif = page.getByText("You have been outbid!Place an");
    this.confirmBidTitle = page.getByRole("heading", { name: "Confirm Bid" });
    this.bidSuccessfull = page.getByRole("heading", { name: "Bid Successful" });
    this.outBidHeading = page.getByRole("heading", {
      name: "You have been outbid!",
    });
    this.closePopup = page.locator("#modal-overlay").getByRole("img");
    this.outBidInput = page.locator('input[name="price"]');
    this.outbidModalBidType = page.getByText("auto");
    this.dropDown = page.locator("form path");
    this.dropDownSelectBidType = page.locator("form svg");
    this.UpdatedbidPrice = page
      .locator("div")
      .filter({ hasText: /^Your bid$/ });

    this.dropDownSelectBidTypeSelectStandard = page.getByText("standard", {
      exact: true,
    });

    this.updateBidAmount = page.getByRole("button", {
      name: "Update bid amount",
    });
    this.PlaceBidAfterUpdatingAmount = page.getByRole("button", {
      name: "Place Bid",
    });

    this.outBidWarningMessage = page.getByText("Click here to increase your");
  }
  async OutBid(page, nextIncrement) {
    await expect(this.confirmBidTitle).toContainText("Confirm Bid");
  await  this.PlaceBidAfterUpdatingAmount.click();
    try {
      await expect(
        page.getByText("You have been outbid!Place an")
      ).toBeVisible();
      const isOutbid = expect(this.outBidHeading).toBeVisible({
        timeout: 60000,
      });
    } catch (error) {
      {
        console.log(error);
      }
    }

  }
}
module.exports = Outbid;