import {otpchannelid1,invaliduserID,ValiduserId, otpChannelId2} from './testData';

const mutationCreateOtp=`mutation createOtp($payload: CreateOtpPayloadInput!) {
  createOtp(
    input: {
      payload: $payload
    }
  ) {
errors {
      ... on ValidationError {
        message
        code
      }
    }
    userOtp {
      id
      isVerified
      otpChannelId
      requestDateTime
      userId
      verificationDateTime
      verifyAttempts
    }
  }
}`


const variablesWithValidOtpchannelIdUserId = {
    payload: {
      otpChannelId: otpchannelid1,
      userId: ValiduserId
    }
  };
  
const variablesEmailOtpChannel = {
  payload: {
    otpChannelId: otpChannelId2,
    userId: ValiduserId
  }
};
  const variables2 = {
    payload: {
      
      userId: invaliduserID
    }
};
const variables3 = {
  payload: {
    otpChannelId: otpchannelid1,
    
  }
};
const variables4 = {
  payload: {
    
    
  }
};
const expectedResponseotpchannelIdMissing={
    "errors": [
        {
            "message": "The required input field `otpChannelId` is missing.",
            "path": [
                "payload",
                "otpChannelId"
            ],
            "extensions": {
                "field": "CreateOtpPayloadInput.otpChannelId"
            }
        }
    ]
}
const expectedResponseUserIdMissing={
  "errors": [
      {
          "message": "The required input field `userId` is missing.",
          "path": [
              "payload",
              "userId"
          ],
          "extensions": {
              "field": "CreateOtpPayloadInput.userId"
          }
      }
  ]
}
  
export{mutationCreateOtp,variablesWithValidOtpchannelIdUserId,variables2,expectedResponseotpchannelIdMissing,variables3,expectedResponseUserIdMissing,variables4,variablesEmailOtpChannel}