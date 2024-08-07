setupEnvForTesting()
const gemini = require("./gemini")
const sampleEmails = require("./sampleEmails")


async function test(){
    gemini.emailsToTasks(sampleEmails) 
}

test()

function setupEnvForTesting(){
    const path = require('path');
    const dotenv = require('dotenv');
    
    // Get the root path of your project
    const rootPath = path.join(__dirname, '..'); 
    
    // Load the .env file from the root path
    dotenv.config({ path: path.join(rootPath, '.env') }); 
}