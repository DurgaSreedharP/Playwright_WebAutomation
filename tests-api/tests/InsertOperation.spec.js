//const { expect, request } = require('@playwright/test');
import { test, expect, } from '@playwright/test';
import { mutation,variables,murrayApiGraphqlUrl,expectedData } from '../Utilities/PayloadPaymentMethod';
//require('dotenv').config();
import {token} from '../Utilities/authorizationToken';



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
 //const token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IjE5RjExNDAwLTI0MDAtNDYxNC04RDRELTgwMjczNjVFRDg2NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtdXJyYXktYXBpIiwianRpIjoiYTJlMjcwNjQtNGFmMi00MDIwLWE2ZDUtNTU5NmFjYzNhMWM0IiwiaWF0IjoxNzE1MDUzMDAyLCJTY29wZSI6Im11cnJheS1hcGkiLCJVc2VySWQiOiI2YTQzNmFhNC1iMTgyLTQxMjMtOTNiZC0xZGQ3OGY5OWMyMDMiLCJuYmYiOjE3MTUwNTMwMDIsImV4cCI6MTc3ODEyNTAwMiwiaXNzIjoiVW5pdmVyc2FsQXV0aFNlcnZlciIsImF1ZCI6IkFueW9uZUNvbnN1bWluZ0FQSSJ9.Q1pRON2d_W4RuAI6G-e20UwClGH7H8LOltZjbp1Ty0Y'
    
 //const AuthorizationToken= process.env.authorizationToken;
 //console.log(process.env.AUTHORIZATION_TOKEN);
 const response=await request.post(murrayApiGraphqlUrl,{ //we post requests to "/" as all calls to GraphQL endpoint are made to the same URL
    headers: {
   'Content-Type': 'application/json',
   'Accept': 'application/json',
        'Authorization': `Bearer ${token}`    
  },
    data: JSON.stringify({
            query: mutation,
            variables
             
          }),
    })
    console.log(response.status(),await response.text());
   expect(response.ok()).toBeTruthy()
 
})

