const fs = require('fs');

function logMostRecentChatMessage(messageData, message){    
    if(message.indexOf('of you like tyrannosaurus u only come with a stack of Egaps, eat all of them and die in 5')!=-1) message = 'lmao ez spawn copypasta'
    
    const logPath = require('path').resolve(__dirname, '../resources/mostRecentChatMessage.json')
    let log = { 
 
    }

    log[messageData.author] = message
     
    let data = JSON.stringify(log);
    fs.writeFileSync(logPath, data);
}

module.exports = logMostRecentChatMessage