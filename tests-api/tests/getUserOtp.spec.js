const Ajv = require('ajv');
const ajv = new Ajv();
const{getOtpvalue}=require("../Utilities/SelectOtpValue");
const {getGraphQlApiResponse}=require("../Utilities/getGraphQLdataApi")
import { test, expect, } from '@playwright/test';
import {getUserOtpQuery} from '../Utilities/userProfileVerifyOtpPayload';
import{getUserOtpSchema} from '../Utilities/getUserSchemas';



  test("TC1: Positive Test: Verifying getUserOtp data api schema  ", async ({
    request,
  }) => {
    const response= await getGraphQlApiResponse (request, { query: getUserOtpQuery});
    console.log(response.status());
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    const ajv = new Ajv();
  const validate=ajv.compile(getUserOtpSchema);
 const isValid = validate(data,getUserOtpSchema);
  expect(isValid).toBeTruthy();
  });
  