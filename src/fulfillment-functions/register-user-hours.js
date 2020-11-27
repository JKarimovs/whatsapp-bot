
function registerUserHours(agent){

    agent.add('Nice. When Janis finishes this fulfillment function I\'ll throw this data into the database. ;)');

    // Get the parameters from the return
    contextOutput = agent.context.get('output-context');
    taskName = contextOutput.parameters['task-name'];
    hours = contextOutput.parameters['hours'];
    projectName = contextOutput.parameters['project-name'];

    
    
    console.log('Task Name: ' + JSON.stringify(taskName));
    console.log('Hours: ' + JSON.stringify(hours));
    console.log('Project Name: ' + JSON.stringify(projectName));

}

module.exports = {
    registerUserHours
}