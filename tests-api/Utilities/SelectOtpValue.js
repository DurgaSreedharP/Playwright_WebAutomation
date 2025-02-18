
const { Client } = require("pg");
import { test, expect } from "@playwright/test";
import { get } from "https";

const getpgAdminconnection = require("./pgAdminConnect");
async function SelectOtpValue() {
  try {
    const client = await getpgAdminconnection();
    const result = await client.query(
      "SELECT * FROM autodeploy.userotp ORDER BY id DESC, requestdatetime DESC LIMIT 1"
    );
    
    expect(result.rows[0].userid).toBe("{D8DDC5E9-B289-4796-880E-3B898A634B99}");
    expect(result.rows[0].otpvalue).not.toBeNull();
    const latestOtpValue = result.rows[0].otpvalue;

    console.log("Latest otpvalue:", latestOtpValue);
    return latestOtpValue;
  } catch (error) {
    console.error(error);
  }
}


async function getOtpvalue(){

  try {
    const client = await getpgAdminconnection();
    const result = await client.query(
      "SELECT * FROM autodeploy.userotp  WHERE userid = '{872481D0-C675-40AB-A84E-6D6669DFE868}' ORDER BY id DESC, requestdatetime DESC LIMIT 1"
    );
    
   expect(result.rows[0].userid).toBe("{872481D0-C675-40AB-A84E-6D6669DFE868}");
    expect(result.rows[0].otpvalue).not.toBeNull();
   // console.log(result);
   const latestOtpValue = result.rows[0].otpvalue;

   console.log("Latest otpvalue:", latestOtpValue);
   return latestOtpValue;
  } catch (error) {
    console.error(error);
  }
}
module.exports = { SelectOtpValue,getOtpvalue };
