const sendChatMessage = require("./sendChatMessage");

function denyCommand(messageData,bot){
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

module.exports = denyCommand