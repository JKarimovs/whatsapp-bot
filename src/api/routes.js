// const express = require('express');

// Endpoints
const indexRoute = require('./routes/index-route');
const whatsappToAgent = require('./routes/whatsapp-to-agent');
const dfFulfillments = require('./routes/fulfillments');

// The contents of this function is included and used in the app.js file.
module.exports = function(app) {

    const bodyParser = require('body-parser');

    // Middlewares
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Register Routes
    app.use("/", indexRoute);
    app.use("/whatsapp", whatsappToAgent);
    app.use("/fulfillment", dfFulfillments);
};