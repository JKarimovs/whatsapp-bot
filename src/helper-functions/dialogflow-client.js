const dialogflow = require('dialogflow').v2beta1;
const hasha = require('hasha');
const WA = require('./twilio');
const structjson = require('structjson');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function messageDfAgent(message, senderID, projectId = process.env.DF_PROJECT_ID) {

    // An identifier for the given session which is a hashed senderID
    const sessionId = hasha(senderID);
  
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // Maybe best to have the below line in the fulfillment functions that deal with Airtable in particular
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
    const result = responses[0].queryResult;

    // console.log('result: ' + JSON.stringify(result));              // CHECK RESULT

    // ==============================================================================
    // COMMENT WHILE TESTING TO SAVE TWILIO CREDIT.
    // REMEMBER TO UNCOMMENT THIS TO GET RESPONSES IN WHATSAPP
    WA.sendMessage(result.fulfillmentText, senderID);   // Respond to sender
    // ==============================================================================
    
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    // console.log(`  Output Contexts: ${JSON.stringify(result.outputContexts)}`);

    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
}

  module.exports = {
    messageDfAgent
}