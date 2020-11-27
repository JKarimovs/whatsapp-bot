const express = require('express');
const router = express.Router();

const { WebhookClient } = require("dialogflow-fulfillment");
const { welcomeIntent } = require('../../fulfillment-functions/welcome-intent');
const { returnUserData } = require('../../fulfillment-functions/get-user-data');
const { returnUserHours } = require('../../fulfillment-functions/get-user-hours');
const { updateUserProfile } = require('../../fulfillment-functions/update-user-profile');
const { registerUserHours } = require('../../fulfillment-functions/register-user-hours');

const { validateUserHours } = require('../../fulfillment-functions/validation/validate-hours');

// /fulfillment route
router.route('/').post( async (req, res) => {

    // console.log(req.body);

    const agent = new WebhookClient({ request: req, response: res });

    // console.log(agent);

    let intentMap = new Map();

    intentMap.set('welcome.user', welcomeIntent);
    intentMap.set('get.userProfile', returnUserData);
    intentMap.set('get.userHours', returnUserHours);
    intentMap.set('update.userProfile.provideFieldValue', updateUserProfile);
    intentMap.set('register.user.hours.confirmSubmission - yes', registerUserHours);

    // Validation functions
    intentMap.set('register.user.hours.hours-amount', validateUserHours);
    agent.handleRequest(intentMap);
});

module.exports = router;