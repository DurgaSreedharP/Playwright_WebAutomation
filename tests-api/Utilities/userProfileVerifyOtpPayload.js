import {otpchannelid1,invaliduserID,ValidUserIdVerifyotp} from './testData';
const mutationVerifyOtp=`mutation VerifyOtp($payload: UpdateOtpPayloadInput!) {
  updateOtp(
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


const variablesInValidandRequired = {
    payload: {
      isVerified: true,
        userId:ValidUserIdVerifyotp,
        otpValue: "250987",
        otpChannelId: otpchannelid1
    }
  };
  
  async function variables2(otp)  {
    return{
    payload: {
        isVerified: false,
        userId:ValidUserIdVerifyotp,
        otpValue: otp,
        otpChannelId: otpchannelid1,
     
    }}}


const variables3 = {
  payload: {
    otpChannelId: otpchannelid1,
    
  }
};
const variables4 = {
  payload: {
    
    
  }
};
const expectedResponseWithInvalidotp={
    "data": {
        "updateOtp": {
            "errors": [
                {
                    "message": "InvalidOtp",
                    "code": "VALIDATION"
                }
            ],
            "userOtp": null
        }
    }
}
    
const getUserQuery=`query getUser {
  users(where: { email: { eq: "testergrays+1224@gmail.com" } }) {
    nodes {
      dateOfBirth
      email
      firstName
      lastName
      mobileNumber
      orgId
      userId
      userType
      userExtended {
        emailVerified
        mobileVerified
        userId
      }
      preferredAddress {
        businessName
        city
        countryCode
        countryName
        createdAt
        csAdapterUpdatedAt
        deliveryInstructions
        description
        firstName
        id
        lastName
        line1
        line2
        locale
        postalCode
        regionCode
        regionName
        telephoneExtension
        telephoneNumber
        typeName
        updatedAt
        updatedBy
        type
      }
      paymentMethods {
        additionalData
        createdAt
        createdBy
        expirationDate
        isDeleted
        isPreferred
        paymentMethodId
        paymentMethodToken
        uniqueIdentifier
        updatedAt
        updatedBy
        userId
        userPaymentMethodId
      }
    }
  }
}`

const getUserOtpQuery=`query userOtps {
  userOtps(
    userId: "{D8DDC5E9-B289-4796-880E-3B898A634B99}"
    channelId: 1
    last: 1
    order: { requestDateTime: ASC }
  ) {
    totalCount
    edges {
      cursor
      node {
        id
        isVerified
        otpChannelId
        requestDateTime
        userId
        verificationDateTime
        verifyAttempts
        channel {
          expiryDurationInMinutes
          id
          name
          resendLockDurationInMinutes
          resendsAllowed
          verifyAttemptLockDurationInMinutes
          verifyAttemptsAllowed
        }
      }
    }
  }
}`
  
export{mutationVerifyOtp,variablesInValidandRequired,expectedResponseWithInvalidotp,variables2,variables4,getUserQuery,getUserOtpQuery}