


{
    this.PlaceBidAfterUpdatingAmount.click();
  await  expect(this.outBidHeading).toContainText('You have been outbid!');
  this.dropDownSelectBidType.click();
  this.dropDownSelectBidTypeSelectStandard.click({timeout:60000});
  this.outBidInput.fill(nextIncrement,{timeout:60000});
  this.updateBidAmount.click({timeout:60000});
  expect(this.UpdatedbidPrice).toContainText("AU$100.00",{timeout:60000})
  this.PlaceBidAfterUpdatingAmount.click({timeout:60000});
  await expect (this.bidSuccessfull).toBeVisible({timeout:60000});
  await expect (this.bidSuccessfull).toHaveText('Bid Successful',{timeout:60000});
  

}
