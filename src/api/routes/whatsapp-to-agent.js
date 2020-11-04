const express = require('express');
const router = express.Router();
const dfClient = require('../../helper-functions/dialogflow-client');

// Route for '/whatsapp'
// The purpose of this route is to recieve a message from Whatsapp/Twilio and pass the message on to Dialofglow
router.route('/').post( async (req, res) => {

    let message = req.body.Body;
    let senderID = req.body.From;

    // Send the user message to Dialogflow Agent
    dfClient.messageDfAgent(message, senderID);

});

module.exports = router;