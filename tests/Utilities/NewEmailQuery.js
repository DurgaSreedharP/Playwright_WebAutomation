const mssql = require("mssql");

const { test } = require("@playwright/test");

const getConnection = require("./connectToDB");

const { expect } = require("@playwright/test");

async function updateUserVerifyStatus(newEmail) {
  const connectionPool = await getConnection();

  try {
    const request = new mssql.Request(connectionPool);

    const MobileVerificationQuery =
      await request.query(`UPDATE Murray_profiles..UserObjectExtended 
        SET EmailVerified = 1
WHERE u_user_id = (SELECT u_user_id 
 FROM [Murray_profiles]..[UserObject] 
 WHERE [u_email_address] = '${newEmail}' )`);
  } finally {
    await connectionPool.close();
  }
}

module.exports = { updateUserVerifyStatus };
