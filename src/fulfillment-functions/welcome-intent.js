
function welcomeIntent(agent){
    
    senderID = agent.originalRequest.payload.senderID; // Get the senders phone number from the payload. Originally added in the request in  dialogflow-client.js

    var Airtable = require('airtable');
    var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

    // Airtable Parameters
    var airtableBase = 'El CoCreators™';
    var airtableField = 'Phone/WhatsApp with country code';

    // Airtable Data Query
    return base(airtableBase)
    .select({
        maxRecords: 1,  // Selecting the first record in Complete Grid:
        view: "Complete Grid",
        filterByFormula: `{${airtableField}} = "${senderID}"`
    })
    .firstPage()
    .then(result => {

        // grab the users name from result and extract the first name
        var userName = JSON.stringify(result[0].fields.Name);
        userName = userName.replace(/\"/g, '').split(' ');
        userFirstName = userName[0];

        // Define various response variations
        var botResponseVariations = [
            'Hey, ' + userFirstName + ', how can I help you?',
            'Hello, ' + userFirstName + ', how can I help you?',
            'Greetings, ' + userFirstName + ', how can I assist?',
        ];

        var pick = Math.floor( Math.random() * botResponseVariations.length ); // Generates random number in the range of total response amount
        var response = botResponseVariations[pick]; // Pick a random response from the response list above

        agent.add(response); // Bot Response to User
    })
    // If the sender is not a member, respond with some generic welcome messages
    .catch(nonMemberResponse => {

        // Define various response variations
        var botResponseVariations = [
            'Hello! How can I help you?',
            'Good day! What can I do for you today?',
            'Greetings! How can I assist?',
        ];
        
        var pick = Math.floor( Math.random() * botResponseVariations.length ); // Generates random number in the range of total response amount
        var response = botResponseVariations[pick]; // Pick a random response from the response list above

        agent.add(response); // Bot Response to User
    })
}

module.exports = {
    welcomeIntent
}