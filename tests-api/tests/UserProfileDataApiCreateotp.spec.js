import { test, expect, } from '@playwright/test';
import {mutationCreateOtp,variablesEmailOtpChannel,variablesWithValidOtpchannelIdUserId,variables2,variables4,expectedResponseUserIdMissing,variables3,expectedResponseotpchannelIdMissing} from '../Utilities/userProfilePayload';
const{SelectOtpValue}=require("../Utilities/SelectOtpValue");
//const {createOtpSTructure}=require("./CreateteOtpSchema");
//import { CreateotpStructure } from './CreateteOtpSchema';
const Ajv = require('ajv');

const CreateotpStructure = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        createOtp: {
          type: "object",
          properties: {
            errors: {
              type: "null",
            },
            userOtp: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                },
                isVerified: {
                  type: "boolean",
                },
                otpChannelId: {
                  type: "integer",
                },
                requestDateTime: {
                  type: "boolean",
                },
                userId: {
                  type: "string",
                },
                verificationDateTime: {
                  type: "null",
                },
                verifyAttempts: {
                  type: "integer",
                },
              },
              required: [
                "id",
                "isVerified",
                "otpChannelId",
                "requestDateTime",
                "userId",
                "verificationDateTime",
                "verifyAttempts",
              ],
            },
          },
          required: ["errors", "userOtp"],
        },
      },
      required: ["createOtp"],
    },
  },
  required: ["data"],
};

const { getGraphQlApiResponse } = require("../Utilities/getGraphQLdataApi");

test("TC1: Positive Test: Create otp with valid user id and Channelid 1 verify the otpvalue in postgres table column created and verify the schema  ", async ({
  request,
}) => {
  const response = await getGraphQlApiResponse(request, {
    query:mutationCreateOtp,
    variables: variablesWithValidOtpchannelIdUserId,
  });
  console.log(response.status(), await response.text());
  expect(response.ok()).toBeTruthy();
  const data = await response.json();

  const ajv = new Ajv();
  const validate = ajv.compile(CreateotpStructure);
  const isValid = validate(data, CreateotpStructure);
  if (isValid) {
    console.log("data is valid");
  } else {
    console.error("data is Invalid");
  }
  expect(data.data.createOtp.userId).toBe(variablesWithValidOtpchannelIdUserId.userId);
  expect(data.data.createOtp.otpChannelId).toBe(variablesWithValidOtpchannelIdUserId.otpChannelId);
  await SelectOtpValue();
});

test("TC5: Positive Test: Create otp with valid user id and Channelid 2 verify the otpvalue in postgres table column created   ", async ({
  request,
}) => {
  const response = await getGraphQlApiResponse(request, {
    query: mutationCreateOtp,
    variables: variablesEmailOtpChannel,
  });
  console.log(response.status(), await response.text());
  expect(response.ok()).toBeTruthy();
  const data = await response.json();

  const ajv = new Ajv();
  const validate = ajv.compile(CreateotpStructure);
  const isValid = validate(data, CreateotpStructure);
  if (isValid) {
    console.log("data is valid");
  } else {
    console.error("data is Invalid");
  }
  expect(data.data.createOtp.userId).toBe(variablesEmailOtpChannel.userId);
  expect(data.data.createOtp.otpChannelId).toBe(variablesEmailOtpChannel.otpChannelId);
  await SelectOtpValue();
});

test("TC2: Negative Test:  Create otp with missing field otpchannelId  ", async ({
  request,
}) => {
  const response = await getGraphQlApiResponse(request, {
    query: mutationCreateOtp,
    variables: variables2,
  });
  console.log(response.status(), await response.text());
  const data = await response.json();
  expect(data).toEqual(expectedResponseotpchannelIdMissing);
});

test("TC3: Negative Test:  Create otp with missing field userId  ", async ({
  request,
}) => {
  const response = await getGraphQlApiResponse(request, {
    query: mutationCreateOtp,
    variables: variables3,
  });
  console.log(response.status(), await response.text());
  const data = await response.json();
  expect(data).toEqual(expectedResponseUserIdMissing);
});

test("TC4: Negative Test:  Create otp with missing fields userId and otpchannelId  ", async ({
  request,
}) => {
  const response = await getGraphQlApiResponse(request, {
    query: mutationCreateOtp,
    variables: variables4,
  });
  console.log(response.status(), await response.text());
  const data = await response.json();
  expect(data).toEqual(expectedResponseUserIdMissing);
});
    
            
          
    
       
        

   
   