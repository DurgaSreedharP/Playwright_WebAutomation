const { expect } = require("@playwright/test");
class yourDetails {
  constructor(page) {
    this.signInButton = page.getByRole("button", { name: "Sign In" });

    this.createAccountSigninPage = page.getByText("Create an account");

    this.emailAddress = page
      .locator("#modal-root")
      .getByPlaceholder("Email Address");

    this.password = page.getByPlaceholder("Password");

    this.createAccount = page.getByRole("button", {
      name: "Create my account",
    });

    this.completeProfileButton = page.getByRole(
      "link",
      { name: "Complete profile" },
      { timeout: 60000 }
    );

    this.firstName = page.getByLabel("First name*");

    this.lastName = page.getByLabel("Last name*");

    this.dobDate = page.getByLabel("Date of birth*");

    this.dobMonth = page.getByLabel("Date of birth - month");

    this.dobYear = page.getByLabel("Date of birth - year");

    this.streetAddress = page.getByLabel("Street address 1*");

    this.CitySuburb = page.getByLabel("City/Suburb*");

    this.postCode = page.getByLabel("Postcode/Zip*");

    this.state = page.getByLabel("State*");

    this.phoneNumber = page.getByPlaceholder("(Optional)");

    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.VerificationPopUpClose = page.locator("#modal-root path").nth(1);
  }

  async createNewUser(
    page,
    newUserEmail,
    newUserPassword,
    newFirstName,
    newLastName,
    newDateOfBirthDay,
    newDateOfBirthMonth,
    newDateOfBirthYear,
    newAddressStreet,
    newAddressSuburb,
    newAddressPostcode,
    newAddressState,
    newPhoneNumber
  ) {
    await this.signInButton.click();

    await this.createAccountSigninPage.click();

    await this.emailAddress.fill(newUserEmail);

    await this.password.fill(newUserPassword);

    await this.createAccount.click();

    await expect(this.completeProfileButton).toBeVisible({ timeout: 60000 });

    await this.completeProfileButton.click({ timeout: 10000 });

    await this.firstName.fill(newFirstName);

    await this.lastName.fill(newLastName);

    await this.dobDate.selectOption(newDateOfBirthDay);

    await this.dobMonth.selectOption(newDateOfBirthMonth);

    await this.dobYear.selectOption(newDateOfBirthYear);

    await this.streetAddress.fill(newAddressStreet);

    await this.CitySuburb.fill(newAddressSuburb);

    await this.postCode.fill(newAddressPostcode);

    await this.state.selectOption(newAddressState);

    await this.submitButton.click();
  }
}

module.exports = yourDetails;
