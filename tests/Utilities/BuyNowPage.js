
import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
class buyNow {
  constructor(page) {
    this.searchBar = page.getByPlaceholder(
      "Search for items, sales and",
      { class: "sc-iaJaUu gsnhRo" },
      { timeout: 60000 }
    );

    this.listings = page.getByRole("button", { name: "All listings" });
    this.listBuynow = page.locator("#react-select-4-option-2");
    this.firstLot = page.getByRole("link", { name: "91 Peter Thompson Wines" });
    this.option = page.locator("#sc-cMa-dbN dFHwsw");
    this.addToCart = page.getByRole("button", { name: "Add to cart" });
    this.checkOut = page.locator(
      "id=ctl00_ctl00_content_content_checkoutCartSummary_checkoutHeaderButton"
    );
    this.placeOrder = page.getByRole("button", { name: "Place Order" });
    this.SuccessfullOrder = page.getByRole("heading", {
      name: "Thank you for shopping with",
    });
    this.updatePaymentDetailonCart = page.getByRole("link", {
      name: "Update My Payment Details",
    });
    this.chooseAnotherWayToPay = page.getByRole("button", {
      name: "Choose another way to pay",
    });
    this.PayingWithCard = page.getByRole("button", {
      name: "Paying with Card",
    });
  }
  async addTocart(page) {
    await page.goto("https://www-uat.grays.com/retail/503283-20");

    await this.addToCart.click();

    await page.reload();
    await this.checkOut.click();
    await allure.attachment(
      "full-page-screenshot.png",
      await page.screenshot({ fullPage: true }),
      {
        contentType: "image/png",
      }
    );

    await this.placeOrder.click();
    await expect(this.SuccessfullOrder).toContainText(
      "Thank you for shopping with Grays."
    );
    await allure.attachment(
      "full-page-screenshot.png",
      await page.screenshot({ fullPage: true }),
      {
        contentType: "image/png",
      }
    );

    return this.addTocart;
  }
}
module.exports = buyNow;