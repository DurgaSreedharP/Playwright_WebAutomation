const {test,expect}= require('@playwright/test');

const murrayApiGraphqlUrl = "https://murrayapi-uat.grays.com.au/data/api/graphql/";
const variables={
    "payload" : {
        "userId": "{000004a7-4e16-4a7f-89de-3a5333a9d4c8}",
        "paymentMethodId": 1,
        "paymentMethodToken": "",
        "isPreferred": true,
        "uniqueIdentifier": "",
        "createdBy": "Swarna Boddu"
    }
  }
  
// Define your GraphQL mutation
const mutation = `mutation($payload:AddUserPaymentMethodPayloadInput!) {
    addUserPaymentMethod(input: {
      payload:$payload
    })
    {
      userPaymentMethod { userPaymentMethodId, paymentMethodId, paymentMethodToken, 
          uniqueIdentifier, additionalData, updatedBy, createdAt, createdBy
      }
      errors {
        code:__typename
        ... on Error {
          message
        }
      }
    }
  }
`;
const expectedErrorMissingRequiredVariable={
  "errors": [
    {
      "message": "The required input field `paymentMethodId` is missing.",
      "path": [
        "payload",
        "paymentMethodId"
      ],
      "extensions": {
        "field": "AddUserPaymentMethodPayloadInput.paymentMethodId"
      }
    }
  ]
}

const expectedData={"data":{"addUserPaymentMethod":{"userPaymentMethod":{"userPaymentMethodId":"43618ca6-43da-4fd1-00a9-08dc602ba809","paymentMethodId":1,"paymentMethodToken":"","uniqueIdentifier":"","additionalData":null,"updatedBy":"DefaultUser","createdAt":"2024-04-19T06:38:17.351Z","createdBy":"Swarna Boddu"},"errors":null}}}
const expectedErrorInvalidUser={"data":{"addUserPaymentMethod":{"userPaymentMethod":null,"errors":[{"code":"UserNotFoundError","message":"UserId - {000004a7-4e16-4a7f-89de-3a5333a9d4ed} not found"}]}}}
export{mutation,variables,murrayApiGraphqlUrl,expectedData,expectedErrorInvalidUser,expectedErrorMissingRequiredVariable}
