const getUserOtpSchema= { "type": "object",
    "properties": {
      "data": {
        "type": "object",
        "properties": {
          "userOtps": {
            "type": "object",
            "properties": {
              "totalCount": {
                "type": "integer"
              },
              "edges": {
                "type": "array",
                "items": [
                  {
                    "type": "object",
                    "properties": {
                      "cursor": {
                        "type": "string"
                      },
                      "node": {
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
                          },
                          "channel": {
                            "type": "object",
                            "properties": {
                              "expiryDurationInMinutes": {
                                "type": "integer"
                              },
                              "id": {
                                "type": "integer"
                              },
                              "name": {
                                "type": "string"
                              },
                              "resendLockDurationInMinutes": {
                                "type": "integer"
                              },
                              "resendsAllowed": {
                                "type": "integer"
                              },
                              "verifyAttemptLockDurationInMinutes": {
                                "type": "integer"
                              },
                              "verifyAttemptsAllowed": {
                                "type": "integer"
                              }
                            },
                            "required": [
                              "expiryDurationInMinutes",
                              "id",
                              "name",
                              "resendLockDurationInMinutes",
                              "resendsAllowed",
                              "verifyAttemptLockDurationInMinutes",
                              "verifyAttemptsAllowed"
                            ]
                          }
                        },
                        "required": [
                          "id",
                          "isVerified",
                          "otpChannelId",
                          "requestDateTime",
                          "userId",
                          "verificationDateTime",
                          "verifyAttempts",
                          "channel"
                        ]
                      }
                   
                    },
                    "required": [
                      "cursor",
                      "node"
                    ]
                  }
                ]
              
              }
              
            },
            "required": [
              "totalCount",
              "edges"
            ]
          }
        },
        "required": [
          "userOtps"
        ]
      }
    },
    "required": [
      "data"
    ]
  }
  
  
  
  const getUserSchema={"type": "object",
    "properties": {
      "data": {
        "type": "object",
        "properties": {
          "users": {
            "type": "object",
            "properties": {
              "nodes": {
                "type": "array",
                "items": [
                  {
                    "type": "object",
                    "properties": {
                      "dateOfBirth": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string"
                      },
                      "firstName": {
                        "type": "string"
                      },
                      "lastName": {
                        "type": "string"
                      },
                      "mobileNumber": {
                        "type": "string"
                      },
                      "orgId": {
                        "type": "null"
                      },
                      "userId": {
                        "type": "string"
                      },
                      "userType": {
                        "type": "string"
                      },
                      "userExtended": {
                        "type": "object",
                        "properties": {
                          "emailVerified": {
                            "type": "boolean"
                          },
                          "mobileVerified": {
                            "type": "boolean"
                          },
                          "userId": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "emailVerified",
                          "mobileVerified",
                          "userId"
                        ]
                      },
                      "preferredAddress": {
                        "type": "object",
                        "properties": {
                          "businessName": {
                            "type": "string"
                          },
                          "city": {
                            "type": "string"
                          },
                          "countryCode": {
                            "type": "null"
                          },
                          "countryName": {
                            "type": "string"
                          },
                          "createdAt": {
                            "type": "string"
                          },
                          "csAdapterUpdatedAt": {
                            "type": "null"
                          },
                          "deliveryInstructions": {
                            "type": "integer"
                          },
                          "description": {
                            "type": "null"
                          },
                          "firstName": {
                            "type": "string"
                          },
                          "id": {
                            "type": "string"
                          },
                          "lastName": {
                            "type": "string"
                          },
                          "line1": {
                            "type": "string"
                          },
                          "line2": {
                            "type": "string"
                          },
                          "locale": {
                            "type": "null"
                          },
                          "postalCode": {
                            "type": "string"
                          },
                          "regionCode": {
                            "type": "string"
                          },
                          "regionName": {
                            "type": "null"
                          },
                          "telephoneExtension": {
                            "type": "null"
                          },
                          "telephoneNumber": {
                            "type": "null"
                          },
                          "typeName": {
                            "type": "string"
                          },
                          "updatedAt": {
                            "type": "string"
                          },
                          "updatedBy": {
                            "type": "null"
                          },
                          "type": {
                            "type": "null"
                          }
                        },
                        "required": [
                          "businessName",
                          "city",
                          "countryCode",
                          "countryName",
                          "createdAt",
                          "csAdapterUpdatedAt",
                          "deliveryInstructions",
                          "description",
                          "firstName",
                          "id",
                          "lastName",
                          "line1",
                          "line2",
                          "locale",
                          "postalCode",
                          "regionCode",
                          "regionName",
                          "telephoneExtension",
                          "telephoneNumber",
                          "typeName",
                          "updatedAt",
                          "updatedBy",
                          "type"
                        ]
                      },
                      "paymentMethods": {
                        "type": "array",
                        "items": [
                          {
                            "type": "object",
                            "properties": {
                              "additionalData": {
                                "type": "string" 
                              },
                              "createdAt": {
                                "type": "string"
                              },
                              "createdBy": {
                                "type": "string"
                              },
                              "expirationDate": {
                                "type": "null"
                              },
                              "isDeleted": {
                                "type": "boolean" 
                              },
                              "isPreferred": {
                                "type": "boolean" 
                              },
                              "paymentMethodId": {
                                "type": "integer"
                              },
                              "paymentMethodToken": {
                                "type": "string"
                              },
                              "uniqueIdentifier": {
                                "type": "string"
                              },
                              "updatedAt": {
                                "type": "string"
                              },
                              "updatedBy": {
                                "type": "string"
                              },
                              "userId": {
                                "type": "string"
                              },
                              "userPaymentMethodId": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "additionalData",
                              "createdAt",
                              "createdBy",
                              "expirationDate",
                              "isDeleted",
                              "isPreferred",
                              "paymentMethodId",
                              "paymentMethodToken",
                              "uniqueIdentifier",
                              "updatedAt",
                              "updatedBy",
                              "userId",
                              "userPaymentMethodId"
                            ]
                          }
                        ]
                      }
                    },
                    "required": [
                      "dateOfBirth",
                      "email",
                      "firstName",
                      "lastName",
                      "mobileNumber",
                      "orgId",
                      "userId",
                      "userType",
                      "userExtended",
                      "preferredAddress",
                      "paymentMethods"
                    ]
                  }
                ]
              }
            },
            "required": [
              "nodes"
            ]
          }
        },
        "required": [
          "users"
        ]
      }
    },
    "required": [
      "data"
    ]
  }
  export{getUserOtpSchema,getUserSchema}