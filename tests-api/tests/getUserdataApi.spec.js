const Ajv = require('ajv');
const ajv = new Ajv();
const{getOtpvalue}=require("../Utilities/SelectOtpValue");
const {getGraphQlApiResponse}=require("../Utilities/getGraphQLdataApi")
import { test, expect, } from '@playwright/test';
import {getUserQuery} from '../Utilities/userProfileVerifyOtpPayload';
import {getUserSchema} from '../Utilities/getUserSchemas';

  test("TC1: Positive Test: Verifying getUser data api schema  ", async ({
    request,
  }) => {
    const response= await getGraphQlApiResponse (request, { query: getUserQuery});
    console.log(response.status());
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    const ajv = new Ajv();
  const validate=ajv.compile(getUserSchema);
 const isValid = validate(data,getUserSchema);
  expect(isValid).toBeTruthy();
  });
  