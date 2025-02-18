//const { expect, request } = require('@playwright/test');
import { test, expect, } from '@playwright/test';
import { mutation,variables,murrayApiGraphqlUrl,expectedData } from './PayloadPaymentMethod';


/*const graphqlUrl = "https://murrayapi-uat.grays.com.au/data/api/graphql/";
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
        ... on Error {0
          message
        }
      }
    }
  }
`;*/

test('should be able to insert the payment method  ',async({request})=>{
    const response=await request.post(murrayApiGraphqlUrl,{ //we post requests to "/" as all calls to GraphQL endpoint are made to the same URL
    headers: {
   'Content-Type': 'application/json',
   'Accept': 'application/json',
            
  },
    data: JSON.stringify({
            query: mutation,
            variables
             
          }),
    })
    console.log(response.status(),await response.text());
   expect(response.ok()).toBeTruthy()
 
})

