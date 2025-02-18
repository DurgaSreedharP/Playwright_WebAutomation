const { expect } = require("@playwright/test");

class watchPage {
  constructor(page) {
    this.testProfile = page.getByText("My Profile");
    this.profile = page.getByText("Profile", { exact: true });
    this.auctionsTab = page.getByRole("link", { name: "Auctions" });
    this.watching = page.getByRole("link", { name: "Watching" });
  }
  async navigatetoWatchTab() {
    await this.testProfile.click();
    await this.profile.click();
    await this.auctionsTab.click();
    await this.watching.click({ timeout: 120000 });
    return this.navigatetoWatchTab;
  }
}

module.exports = watchPage;
