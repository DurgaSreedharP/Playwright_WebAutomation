
import { url } from "inspector";
import { baseurl,GenerateOtp,VerifyOtp,UserLogin,UserLogout } from "./profileManagerEndpoint";


async function getProfileManager(url,request,data) {
    const response = await request.post( url,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
       
      },
      data: JSON.stringify(data),
    });
  
    return response;
  }
  module.exports={getProfileManager}