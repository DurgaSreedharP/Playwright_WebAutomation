const Ajv = require('ajv');
const ajv = new Ajv();
const{getOtpvalue}=require("../Utilities/SelectOtpValue");
const {getGraphQlApiResponse}=require("../Utilities/getGraphQLdataApi")
import { test, expect, } from '@playwright/test';
import { expectedResponseWithInvalidotp,expectedResponsewithValidotpValue, mutationVerifyOtp,variablesInValidandRequired,variables2 } from '../Utilities/userProfileVerifyOtpPayload';
import { otpchannelid1 } from '../Utilities/testData';

test("TC1: Negative Test: Verify user with invalid otp value  ", async ({
  request,
}) => {
  const response = await getGraphQlApiResponse(request, {
    query: mutationVerifyOtp,
    variables: variablesInValidandRequired,
  });
  console.log(response.status(), await response.text());
  const data = await response.json();
  expect(data).toEqual(expectedResponseWithInvalidotp);
});
test("TC2: Positive Test: Verify user with Valid otp value  ", async ({
  request,
}) => {
  const otp = await getOtpvalue();
  const payload = await variables2(otp);
  const response = await getGraphQlApiResponse(request, {
    query: mutationVerifyOtp,
    variables: payload,
  });
  console.log(response.status(), await response.text());
  const data = await response.json();
  expect(Object.keys(data.data.updateOtp.userOtp).length).toBe(7);
  expect(data.data.updateOtp.userOtp.otpChannelId).toBe(otpchannelid1);
  expect(typeof data.data.updateOtp.userOtp.isVerified).toBe("boolean");
  expect(typeof data.data.updateOtp.userOtp.userId).toBe("string");
});

test("TC3: Negative Test: Verify user with missing fields  ", async ({
  request,
}) => {
  const response = await getGraphQlApiResponse(request, {
    query: mutationVerifyOtp,
    variables: variablesInValidandRequired,
  });
  console.log(response.status(), await response.text());
  const data = await response.json();
  //  expect(data).toEqual(expectedResponseWithInvalidotp);
});