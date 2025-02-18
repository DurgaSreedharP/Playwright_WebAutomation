const Ajv = require('ajv');
const ajv = new Ajv();
     
      


        const CreateotpStructure=
          {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "properties": {
              "data": {
                "type": "object",
                "properties": {
                  "createOtp": {
                    "type": "object",
                    "properties": {
                      "errors": {
                        "type": "null"
                      },
                      "userOtp": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer"
                          },
                          "isVerified": {
                            "type": "boolean"
                          },
                          "otpChannelId": {
                            "type": "integer"
                          },
                          "requestDateTime": {
                            "type": "string"
                          },
                          "userId": {
                            "type": "string"
                          },
                          "verificationDateTime": {
                            "type": "null"
                          },
                          "verifyAttempts": {
                            "type": "integer"
                          }
                        },
                        "required": [
                          "id",
                          "isVerified",
                          "otpChannelId",
                          "requestDateTime",
                          "userId",
                          "verificationDateTime",
                          "verifyAttempts"
                        ]
                      }
                    },
                    "required": [
                      "errors",
                      "userOtp"
                    ]
                  }
                },
                "required": [
                  "createOtp"
                ]
              }
            },
            "required": [
              "data"
            ]
          }
         
        
module.exports={CreateotpStructure};

   
   