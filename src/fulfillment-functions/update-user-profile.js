

function updateUserProfile(agent){
    
    senderID = agent.originalRequest.payload.senderID; // Get the senders phone number from the payload. Originally added in the request in  dialogflow-client.js
    updateField = agent.context.contexts['awaiting-profile-field-value'].parameters['profile-field-type']; // Get the field type to update in Airtable
    updateFieldValue = agent.query;

    console.log('Update Field Type: ' + updateField);
    console.log('Update Field Value: ' + updateFieldValue);

    agent.add('Update User Profile Function Reached');

}

module.exports = {
    updateUserProfile
}