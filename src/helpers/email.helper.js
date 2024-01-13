const SibApiV3Sdk = require('@sendinblue/client')
require('dotenv').config()

// var apiInstance = new SibApiV3Sdk.AccountApi()
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
// Configure API key authorization: apiKey

apiInstance.setApiKey(SibApiV3Sdk.AccountApiApiKeys.apiKey,"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")





var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

// CreateContact | Values to create a contact
 const EmailerHelper=({content,receiver})=>{
// console.log("nkjnjkn",createContact)
sendSmtpEmail = {
    sender:{email:'kryptomerch.io@gmail.com'},
    to: [{
        email: receiver,
        name:"Kryptomerch"
    }],
    params: {
        name: 'John',
        surname: 'Doe'
    },
   subject:"test subject",
   htmlContent:content

};

apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
  
}, function(error) {
  console.error(error);
});

}


module.exports = {
EmailerHelper
};