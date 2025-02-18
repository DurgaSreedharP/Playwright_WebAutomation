import { test, expect, } from '@playwright/test';
import { expectedErrorInvalidUser } from '../Utilities/PayloadPaymentMethod';
import {token} from '../Utilities/authorizationToken';

const graphqlUrl = "https://murrayapi-uat.grays.com.au/data/api/graphql/";
const variables={
    "payload" : {
        "userId": "{000004a7-4e16-4a7f-89de-3a5333a9d4ed}",
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
test('Should throw an error invalid userid  ',async({request})=>{
    const response=await request.post(graphqlUrl,{ //we post requests to "/" as all calls to GraphQL endpoint are made to the same URL
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
           'Authorization': `Bearer ${token}` ,   
       
          },
          data: JSON.stringify({
            query: mutation,
            variables
            
          }),
        })
    
    console.log(response.status(),await response.text());
  await  expect(response.ok()).toBeTruthy()
  const data= await response.json();
  expect(data).toEqual(expectedErrorInvalidUser);
})

