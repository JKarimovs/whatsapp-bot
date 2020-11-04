const dialogflow = require('dialogflow').v2beta1;
const uuid = require('uuid');
const WA = require('./twilio');
const structjson = require('structjson');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function messageDfAgent(message, senderID) {

    // Google Cloud Platform Project ID
    const projectId = 'nabo-dialogflow-293914';

    // A unique identifier for the given session
    const sessionId = uuid.v4();
  
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // console.log('sender id: ' + senderID); // Reached

    senderPhoneNr = senderID.replace(/whatsapp:/g, '');   // remove the 'whatsapp:' part from the senderID string to match Airtable database phone number inputs

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,             // The query to send to the dialogflow agent
          languageCode: 'en-US',    // The language used by the client (en-US)
        }
      },
      queryParams: {
        payload: structjson.jsonToStructProto({senderID: senderPhoneNr}) // Pass the sender phone number to the request payload for later access in the response
      }
    };

    // console.log('request: ' + JSON.stringify(request));       // CHECK REQUEST

    const responses = await sessionClient.detectIntent(request);  // Send request and log result

    console.log('Detected intent');

    const result = responses[0].queryResult;

    // console.log('result: ' + toString(result));              // CHECK RESULT

    // ==============================================================================
    // COMMENT WHILE TESTING TO SAVE TWILIO CREDIT.
    // REMEMBER TO UNCOMMENT THIS TO GET RESPONSES IN WHATSAPP
    WA.sendMessage(result.fulfillmentText, senderID);   // Respond to sender
    // ==============================================================================
    
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
}

  module.exports = {
    messageDfAgent
}