
function returnUserData(agent){
    
    senderID = agent.originalRequest.payload.senderID; // Get the senders phone number from the payload. Originally added in the request in  dialogflow-client.js

    var Airtable = require('airtable');
    var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

    var userData;

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

        // Bot Response String
        userData = 'Here\'s the profile data we have on you. \n\n' +
                   '*Name:* ' + result[0].fields.Name + '\n' +
                   '*Email:* ' + result[0].fields.Email + '\n' +
                   '*Phone Number:* ' + result[0].fields[airtableField] + '\n' +
                   '*About Investor:* ' + result[0].fields['About investor'];

        agent.add(userData); // Bot Response to User

    })
    .catch(error => {
        console.log('Error at catch: ' + error);
        agent.add('Sorry, I couldn\'t find you in our system. Contact the administration to make sure you\'re registered.'); // Bot Response to User
    })
}

module.exports = {
    returnUserData
}