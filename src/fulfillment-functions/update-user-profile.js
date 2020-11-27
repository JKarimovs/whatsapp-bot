
function updateUserProfile(agent){
    
    // Extract a bunch of information from the DF response
    senderID = agent.originalRequest.payload.senderID; // Get the senders phone number from the payload. Originally added in the request in  dialogflow-client.js
    updateFieldName = agent.context.contexts['awaiting-profile-field-value'].parameters['profile-field-type']; // Get the field type to update in Airtable
    updateFieldValue = agent.query; // User input to update field with

    // Match Dialogflow parameters with Airtable field names
    if(updateFieldName == 'about investor') {
        updateFieldName = 'About investor';
    }
    else if(updateFieldName == 'email') {
        updateFieldName = 'Email';
    }
    else {
        updateFieldName = null;
        agent.add('Sorry, there was an error on our end. Contact the administration.');
    }

    // console.log('Update Field Name: ' + updateFieldName);
    // console.log('Update Field Value: ' + updateFieldValue);

    // Airtable Parameters
    var airtableBase = 'El CoCreators™';
    var airtableField = 'Phone/WhatsApp with country code';

    // Airtable Functions
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

    // Airtable Data Query
    // First get the row ID for the requesting user, then update the requested field using the retrieved id
    return base(airtableBase)
    .select({
        maxRecords: 1,  // Selecting the first record in Complete Grid:
        view: "Complete Grid",
        filterByFormula: `{${airtableField}} = "${senderID}"`
    })
    .firstPage()
    // Now update the field
    .then(result => {

        // Get record ID from response
        var senderRecordID = result[0].id;

        base(airtableBase).update(senderRecordID, {
            [updateFieldName]: updateFieldValue     // Make the update
        })
        .catch(error => {
            console.error('Error at field update: ' + error);   // Throw error
        })

        agent.add('*Your ' + updateFieldName + ' information has been updated with:* "' + updateFieldValue + '"');  // Reply to user with success message
    })
    .catch(error => {
        console.error('Error at catch: ' + error);
        agent.add('Sorry, I couldn\'t find you in our system. Contact the administration to make sure you\'re registered.'); // Respond to user with error message
    })
}

module.exports = {
    updateUserProfile
}