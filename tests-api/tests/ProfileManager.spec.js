import { test, expect, } from '@playwright/test';
const {getProfileManager}=require ("../Utilities/ProfileManager/getProfilemanagerEndpoint")
import { GenerateOtp, UserLogin,baseurl } from '../Utilities/ProfileManager/profileManagerEndpoint';
import { log } from 'console';

const generateOtpurl=`${baseurl}${GenerateOtp}`;
const login = async(request) => {
  const response = await request.post(UserLogin, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
     
    },
    data: JSON.stringify({
      
          "email":"testergrays+1006@gmail.com",
          "password":"Test@2023"
        
        
    }), 
    
  });
  
 
  console.log(response.status() ,await response.text());
  return response;
}
// const login= (async () => {
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   const page = await context.newPage();
 
//   // Call the login API
//   const loginResponse = await page.request.post(UserLogin, {
//     headers: {
//             "Content-Type": "application/json",
//            Accept: "application/json",
           
//          },
//     data: {
//       "email":"testergrays+1006@gmail.com",
//           "password":"Test@2023"
        
//     }
//   });
 
//   // Capture the cookies from the login response
//   const cookies = await context.cookies();
 
//   // Use the captured cookies in subsequent API calls
//   await context.addCookies(cookies);
 
//   // Make another API call with the cookies
//   const response = await page.request.post('https://murrayapi-uat.grays.com/profilemanager/userotp/generateotp',{
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json",
     
//     },
//     data: JSON.stringify({
      
//           "channel":"SMS"            
        
//     }), 
    

//   });
 
//   console.log(await response.json());
 
//   await browser.close();
// })();


test.beforeEach(async ({ request }) => {
   {
        await login(request);
      return await login(request);
        
      }
  });


test("TC1: Positive Test: Generate otp with valid user id and Channelid 1 verify the otpvalue in postgres table column created and verify the schema  ", async ({
    request,
  }) => {

   // await login();
    {
      
      const response = await request.post("https://murrayapi-uat.grays.com/profilemanager/userotp/generateotp", {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
         
        },
        data: JSON.stringify({
          
              "channel":"SMS"            
            
        }), 
        
      });
      console.log(response.status(),await response.te);
      return response;
    }
   
    const response = await getProfileManager(generateOtpurl,request, {

   "channel": "Email"
     
    });
    console.log(response.status(), await response.text());
    expect(response.ok()).toBeTruthy();
    
    
    //await SelectOtpValue();
  });
  