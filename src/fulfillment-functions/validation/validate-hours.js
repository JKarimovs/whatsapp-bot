
// ############## IN PROGRESS ##############
function validateUserHours(agent){

    // Get the parameters from the return
    var userQuery = agent.query;
    
    if(userQuery.includes(',')) {
        //  Do stuff
    }

    console.log('Hours: ' + JSON.stringify(hours));

    agent.add(JSON.stringify(hours));

}

module.exports = {
    validateUserHours
}