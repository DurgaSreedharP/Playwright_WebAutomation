const { expect } = require("@playwright/test");
const PaymentsData = require("./PaymentsData");

class PaymentPage {
  constructor(page) {
    this.page = page;
    this.myProfile = page.getByText("My Profile");
    this.profileinmyprofile = page.getByText("Profile", { exact: true });
    this.yourDetails = page.getByRole("link", { name: "Your Details" });
    this.paymentDetails = page.getByRole("link", { name: "Payment" });
    this.choosePaymentOptions = page.getByRole(
      "button",
      { name: "Choose another way to pay" },
      { timeout: 180000 }
    );
    //this.choosePaymentOptions=page.getByRole('button', {: 'braintree-large-button braintree-toggle' });
    this.payWithCard = page.getByRole("button", { name: "Paying with Card" });
    this.CardNumberInput = page
      .frameLocator('iframe[name="braintree-hosted-field-number"]')
      .getByPlaceholder("•••• •••• •••• ••••");
    this.expiryDateInput = page
      .frameLocator('iframe[name="braintree-hosted-field-expirationDate"]')
      .getByPlaceholder("MM/YY");
    this.cvvInput = page
      .frameLocator('iframe[name="braintree-hosted-field-cvv"]')
      .getByPlaceholder("•••");
    this.AddDetails = page.getByRole("button", { name: "Add Card Details" });
    this.Authentication = page
      .frameLocator('iframe[title="Bank Authentication"]')
      .getByPlaceholder(" Enter Code Here");
    this.enterCode = page
      .frameLocator('iframe[title="Bank Authentication"]')
      .getByRole("button", { name: "SUBMIT" });
    this.ChangesSavedHeading = page.getByRole(
      "heading",
      { name: "Changes saved successfully" },
      { timeout: 180000 }
    );
    this.cardPlaceHolderonConfirmBid = page.getByText("VISA: xxxx xxxx xxxx", {
      timeout: 60000,
    });
    this.PaymentCardHolder = page.getByRole(
      "button",
      { name: "Ending in 1111" },
      { timeout: 60000 }
    );
    this.InvalidCardPopup = page.getByText("This card number is not valid.", {
      timeout: 60000,
    });
    this.debitCardPlaceHolder = page.getByRole("button", {
      name: "Ending in 0125",
    });
  }
  async PaymentTab() {
    await this.payWithCard.click();

    return this.PaymentTab;
  }
  async MyProfile() {
    await this.myProfile.click({ timeout: 180000 });
    await this.profileinmyprofile.click();

    await this.paymentDetails.click({ timeout: 180000 });
    return this.MyProfile;
  }
  async enterPaymentDetails(CreditCard, expiryDate, cvv, authentication) {
    await this.CardNumberInput.fill(CreditCard);
    await this.expiryDateInput.fill(expiryDate);
    await this.cvvInput.fill(cvv);
    await this.AddDetails.click();
    await this.Authentication.fill(authentication, { timeout: 120000 });
    await this.enterCode.click();
    return this.enterPaymentDetails;
  }
  async enterInvalidPaymentDetails() {
    await this.CardNumberInput.fill(PaymentsData.InvalidCard);
    await this.expiryDateInput.click();
  }

  async PaymentPageExist() {
    await this.myProfile.click();
    await this.profileinmyprofile.click();
    await this.paymentDetails.click({ timeout: 180000 });
    return this.PaymentPageExist;
  }
  async enterPaymentDetailsConfirmBid(
    CreditCard,
    expiryDate,
    cvv,
    authentication
  ) {
    await this.choosePaymentOptions.click();
    await this.payWithCard.click({ timeout: 60000 });
    await this.CardNumberInput.fill(CreditCard);
    await this.expiryDateInput.fill(expiryDate);
    await this.cvvInput.fill(cvv);
    await this.AddDetails.click();
    await this.Authentication.fill(authentication, { timeout: 120000 });
    await this.enterCode.click();
  }
}
module.exports = PaymentPage;
