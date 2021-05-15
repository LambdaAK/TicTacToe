const fs = require('fs')

class CommandClass {
    denyCommand(messageData,bot){
        const playerDict = Object.keys(bot.players)
        let isNicked = true
        for(var x = 0;x<playerDict.length;x++){
            if(messageData.author == playerDict[x]) isNicked = false
        }
        
        if(isNicked){
            sendChatMessage(`${messageData.author}, this command doesn't support nicked players!`,bot)
        }
        return isNicked
    }

    issueCommand(message, bot) {
        bot.chat(`/${message}`)
    }

    sendChatMessage(message, bot, messageDict = {author: "undefined"}) {
        bot.chat(`&6${message}`)
        this.logMostRecentChatMessage(messageDict,message)
    }

    sendPm(reciever, message, bot) {
        bot.chat(`/msg ${reciever} ${message}`)
    }

    logMostRecentChatMessage(messageData, message){    
        const logPath = require('path').resolve(__dirname, '../resources/mostRecentChatMessage.json')
        let log = { 
     
        }
    
        log[messageData.author] = message
         
        let data = JSON.stringify(log);
        fs.writeFileSync(logPath, data);
    }
}

module.exports = CommandClass