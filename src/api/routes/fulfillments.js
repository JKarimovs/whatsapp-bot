const express = require('express');
const router = express.Router();

const { WebhookClient } = require("dialogflow-fulfillment");
const { returnUserData } = require('../../fulfillment-functions/get-user-data');
const { returnUserHours } = require('../../fulfillment-functions/get-user-hours');

// /fulfillment route
router.route('/').post( async (req, res) => {

    // console.log(req.body);

    const agent = new WebhookClient({ request: req, response: res });

    // console.log(agent);

    let intentMap = new Map();

    intentMap.set('Get User Profile Info', returnUserData);
    intentMap.set('Get User Hours', returnUserHours);
    agent.handleRequest(intentMap);
});

module.exports = router;