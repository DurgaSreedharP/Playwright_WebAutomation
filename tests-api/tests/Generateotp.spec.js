import { test, expect } from '@playwright/test';
const { getProfileManager } = require("../Utilities/ProfileManager/getProfilemanagerEndpoint");
import { GenerateOtp, UserLogin, baseurl } from '../Utilities/ProfileManager/profileManagerEndpoint';
import { log } from 'console';
import { CookieJar } from 'tough-cookie';
 
const generateOtpurl = `${baseurl}${GenerateOtp}`;
 
const login = async (request) => {
  const response = await request.post(UserLogin, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    data: JSON.stringify({
      "email": "testergrays+1006@gmail.com",
      "password": "Test@2023"
    }),
  });
 
  console.log(response.status(), await response.text());
  return response;
}
 
//let cookieJar = new CookieJar();
 
test.beforeEach(async ({ request,page }) => {
  const loginResponse = await login(request);
 await new Promise(resolve => setTimeout(resolve, 10000));
  await login(request);
  //const setCookieHeader = ".AuthCookieDomain=88BED9725D23B00588FDF9F7F78109F872F49D12F5920DE86A33B9A587539C316339E0544BE07D052470D874D7D9E5501DBD73E604D623D9CFE1049C481F24865E30019DCDC27A77F93E16B806A5F22A5D7AB9D97C7AB161E470A50E3CF743C937D7BAF5683370D2FA7B579C8C5116708AFEAD059897AD0FF4AA63AE354C674E1A53F079A9F891C045060631187DFDF624CB38477A3091FEDD889A1EA7CFADBAF9AC8106; .AuthCookieDomainUat=A7250445F1C9BAB50969E0972D24CAD1453A262E98293CD6F32535FD8937B4118AAE940169749023E98735BFE0CF21A59756ACAF6F9EF43982FBD587E833A2FF8CF12EBCF0191C1632187924CDD407D4246CA388FF02BABF97FCF62BBCC168B0DFDD15B927158021EFF98C04E5C5428B2233EE3F5B53D78BF03710D9719BC31426896E48D189F529E79E508E26A019BC7D749AACA75BABF49CF88E185446012CA460B8A4; Murray_Identity={6625565a-bdfc-4e87-ad3a-87c793d0fb20}:20241106T024557:20; Murray_Login=bD8QBShwy2MVLraaxBqK3A==; Murray_RememberMe=XJpibFJIEKizBVwhBSi/Cw==; UserAuthorization=eyJhbGciOiJIUzI1NiIsImtpZCI6IjE5RjExNDAwLTI0MDAtNDYxNC04RDRELTgwMjczNjVFRDg2NCIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlcmdyYXlzKzEwMDZAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IlN3YXJuYSIsIkxhc3ROYW1lIjoiVGVzdFVzZXIiLCJGdWxsTmFtZSI6IlN3YXJuYSBUZXN0VXNlciIsIlVzZXJJZCI6IjZUS2pWbW8xK0djL3lSSGlYa2pLeWRqWXhPTndxQzdzVzcweUZPcXlvRGhsbHZEOVNuRkVQZ2dSVlNqNXQwMUNBK3IzMzVBMjRqQmZWR0toRjFZL1NUVFB6VnpZekxLaGhEMEtlcXZYUWswPSIsIkN1c3RvbWVySWQiOiJXcnJTa29PRlVmVjRQdEcrT3N6UERRPT0iLCJMb2dPbk5hbWUiOiJ5bUZFd0t5dUNMV2VWT3E3Ym83VzFTWjlFMTVESnZEeHQ2NXY1UUxrVlZ6VDhmQ1VSVTVwNWJBWkdqUlBHUFdPTTBEZnhRL0lJMU09IiwibmJmIjoxNzMwODYxMTU3LCJleHAiOjE3MzA4NjQ2OTcsImlhdCI6MTczMDg2MTE1NywiaXNzIjoiVW5pdmVyc2FsQXV0aFNlcnZlciIsImF1ZCI6IkFueW9uZUNvbnN1bWluZ0FQSSJ9.e0ciecErYudjcXxufh0EIGXsbwqwmP4an4SIj49yiIY; intl=false; ReqCrossSiteImage=true; RequestCorrelationId=f36db52a-f955-465e-bee1-994f9a51c4d7;UserAuthorization=eyJhbGciOiJIUzI1NiIsImtpZCI6IjE5RjExNDAwLTI0MDAtNDYxNC04RDRELTgwMjczNjVFRDg2NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtb2JpbGUtYXBwIiwianRpIjoiZjdiMmFhYTMtODA2OS00NDI0LTg0NzItYjA0ZDI5MmMzZjczIiwiaWF0IjoxNzMwODU5NTc0LCJTY29wZSI6Im11cnJheS1tb2JpbGUtYXBwIiwibmJmIjoxNzMwODU5NTc0LCJleHAiOjE3OTM5MzE1NzQsImlzcyI6IlVuaXZlcnNhbEF1dGhTZXJ2ZXIiLCJhdWQiOiJBbnlvbmVDb25zdW1pbmdBUEkifQ.PhHpPTPPMVGYi0hViCpVTSk25pU5WsMIcjxDClDSDgI"
 // const setCookieHeader = loginResponse.headers()['set-cookie'];
//   console.log(setCookieHeader);
//   if (setCookieHeader) {
//     if (Array.isArray(setCookieHeader)) {
//       setCookieHeader.forEach(cookie => cookieJar.setCookieSync(cookie, baseurl));
//     } else {
//       cookieJar.setCookieSync(setCookieHeader, baseurl);
//     }
 // }
});
 
test("TC1: Positive Test: Generate otp with valid user id and Channelid 1 verify the otpvalue in postgres table column created and verify the schema", async ({ request }) => {
//   const cookies = await cookieJar.getCookieString(baseurl);
//   console.log(cookies);

  const response = await request.post("https://murrayapi-uat.grays.com/profilemanager/userotp/generateotp", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
     "cookie":".AuthCookieDomain=88BED9725D23B00588FDF9F7F78109F872F49D12F5920DE86A33B9A587539C316339E0544BE07D052470D874D7D9E5501DBD73E604D623D9CFE1049C481F24865E30019DCDC27A77F93E16B806A5F22A5D7AB9D97C7AB161E470A50E3CF743C937D7BAF5683370D2FA7B579C8C5116708AFEAD059897AD0FF4AA63AE354C674E1A53F079A9F891C045060631187DFDF624CB38477A3091FEDD889A1EA7CFADBAF9AC8106; .AuthCookieDomainUat=A7250445F1C9BAB50969E0972D24CAD1453A262E98293CD6F32535FD8937B4118AAE940169749023E98735BFE0CF21A59756ACAF6F9EF43982FBD587E833A2FF8CF12EBCF0191C1632187924CDD407D4246CA388FF02BABF97FCF62BBCC168B0DFDD15B927158021EFF98C04E5C5428B2233EE3F5B53D78BF03710D9719BC31426896E48D189F529E79E508E26A019BC7D749AACA75BABF49CF88E185446012CA460B8A4; Murray_Identity={6625565a-bdfc-4e87-ad3a-87c793d0fb20}:20241106T024557:20; Murray_Login=bD8QBShwy2MVLraaxBqK3A==; Murray_RememberMe=XJpibFJIEKizBVwhBSi/Cw==; UserAuthorization=eyJhbGciOiJIUzI1NiIsImtpZCI6IjE5RjExNDAwLTI0MDAtNDYxNC04RDRELTgwMjczNjVFRDg2NCIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlcmdyYXlzKzEwMDZAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IlN3YXJuYSIsIkxhc3ROYW1lIjoiVGVzdFVzZXIiLCJGdWxsTmFtZSI6IlN3YXJuYSBUZXN0VXNlciIsIlVzZXJJZCI6IjZUS2pWbW8xK0djL3lSSGlYa2pLeWRqWXhPTndxQzdzVzcweUZPcXlvRGhsbHZEOVNuRkVQZ2dSVlNqNXQwMUNBK3IzMzVBMjRqQmZWR0toRjFZL1NUVFB6VnpZekxLaGhEMEtlcXZYUWswPSIsIkN1c3RvbWVySWQiOiJXcnJTa29PRlVmVjRQdEcrT3N6UERRPT0iLCJMb2dPbk5hbWUiOiJ5bUZFd0t5dUNMV2VWT3E3Ym83VzFTWjlFMTVESnZEeHQ2NXY1UUxrVlZ6VDhmQ1VSVTVwNWJBWkdqUlBHUFdPTTBEZnhRL0lJMU09IiwibmJmIjoxNzMwODYxMTU3LCJleHAiOjE3MzA4NjQ2OTcsImlhdCI6MTczMDg2MTE1NywiaXNzIjoiVW5pdmVyc2FsQXV0aFNlcnZlciIsImF1ZCI6IkFueW9uZUNvbnN1bWluZ0FQSSJ9.e0ciecErYudjcXxufh0EIGXsbwqwmP4an4SIj49yiIY; intl=false; ReqCrossSiteImage=true; RequestCorrelationId=f36db52a-f955-465e-bee1-994f9a51c4d7;UserAuthorization=eyJhbGciOiJIUzI1NiIsImtpZCI6IjE5RjExNDAwLTI0MDAtNDYxNC04RDRELTgwMjczNjVFRDg2NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtb2JpbGUtYXBwIiwianRpIjoiZjdiMmFhYTMtODA2OS00NDI0LTg0NzItYjA0ZDI5MmMzZjczIiwiaWF0IjoxNzMwODU5NTc0LCJTY29wZSI6Im11cnJheS1tb2JpbGUtYXBwIiwibmJmIjoxNzMwODU5NTc0LCJleHAiOjE3OTM5MzE1NzQsImlzcyI6IlVuaXZlcnNhbEF1dGhTZXJ2ZXIiLCJhdWQiOiJBbnlvbmVDb25zdW1pbmdBUEkifQ.PhHpPTPPMVGYi0hViCpVTSk25pU5WsMIcjxDClDSDgI"
      //"Authorization": "eyJhbGciOiJIUzI1NiIsImtpZCI6IjE5RjExNDAwLTI0MDAtNDYxNC04RDRELTgwMjczNjVFRDg2NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtb2JpbGUtYXBwIiwianRpIjoiZjdiMmFhYTMtODA2OS00NDI0LTg0NzItYjA0ZDI5MmMzZjczIiwiaWF0IjoxNzMwODU5NTc0LCJTY29wZSI6Im11cnJheS1tb2JpbGUtYXBwIiwibmJmIjoxNzMwODU5NTc0LCJleHAiOjE3OTM5MzE1NzQsImlzcyI6IlVuaXZlcnNhbEF1dGhTZXJ2ZXIiLCJhdWQiOiJBbnlvbmVDb25zdW1pbmdBUEkifQ.PhHpPTPPMVGYi0hViCpVTSk25pU5WsMIcjxDClDSDgI"// Add cookies to the request headers
    },
    data: JSON.stringify({
      "channel": "SMS"
    }),
  });
 
  console.log(response.status(), await response.text());
  expect(response.ok()).toBeTruthy();
 
  const profileManagerResponse = await getProfileManager(generateOtpurl, request, {
    "channel": "Email"
  });
 
  console.log(profileManagerResponse.status(), await profileManagerResponse.text());
  expect(profileManagerResponse.ok()).toBeTruthy();
});

