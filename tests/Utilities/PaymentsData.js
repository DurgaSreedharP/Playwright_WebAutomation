const {test,expect}= require('@playwright/test');
const PaymentPageUAT= require('./PaymentPageUAT');

const InvalidCard='411111111'
const creditCard='4111111111111111'
const cvv='123'
const expiryDate='12/2027'
const debitCard='4012000033330125'
const authentication='1234'
const TestUser='testergrays+2224@gmail.com'
const TestUserPayments='testergrays+20240809001457821Z@gmail.com'
const password='password#'
const TestUser1='testergrays+24@gmail.com'
const testUser2='testergrays+3467@gmail.com'
const InvalidUserEmail='testerGrays@gmail.com'
const InvalidPassword='passInvalid#'
const creditCardNumberEndingin='Ending in 1111'
const CreditCardDetailsonConfirmBid='VISA: xxxx xxxx xxxx 1111'
const InvalidCardText='This card number is not valid'
const ChangesSavedText='Changes saved successfully'
const debitCardText='Ending in 0125'
export{creditCard, cvv, expiryDate, debitCard, authentication, TestUser, password,InvalidCard,testUser2,TestUserPayments,InvalidUserEmail,InvalidPassword,creditCardNumberEndingin,CreditCardDetailsonConfirmBid,InvalidCardText,ChangesSavedText,debitCardText}