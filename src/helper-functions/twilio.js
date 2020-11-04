var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
 
const twilio = require('twilio')(accountSid, authToken, { 
    lazyLoading: true 
});

// Function to send message to WhatsApp
const sendMessage = async (message, senderID) => {

    console.log(senderID);

    try {
        await twilio.messages.create({
            to: senderID,
            body: message,
            from: 'whatsapp:+14155238886'
        });
    } catch (error) {
        console.error('Error at sendMessage --> ' + error);
    }
};

module.exports = {
    sendMessage
}