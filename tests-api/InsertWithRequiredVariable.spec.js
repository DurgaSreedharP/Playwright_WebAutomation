
import { test, expect, } from '@playwright/test';
import { mutation,murrayApiGraphqlUrl,expectedData, expectedErrorMissingRequiredVariable } from './PayloadPaymentMethod';

const variables= {"payload" : {
         "userId": "{000004a7-4e16-4a7f-89de-3a5333a9d4c8}",
         "paymentMethodToken": "",
         "isPreferred": true,
         "uniqueIdentifier": "",
         "createdBy": "Swarna Boddu"
     }
 }

test('Should throw missing variable error ',async({request})=>{
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
  const data= await response.json();
  expect(data).toEqual(expectedErrorMissingRequiredVariable);
})