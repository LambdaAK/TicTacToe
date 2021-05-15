const logMostRecentChat = require('./logMostRecentChat')

function sendChatMessage(message, bot, messageDict = {author: "undefined"}) {
    bot.chat(`&6${message}`)
    logMostRecentChat(messageDict,message)
}

module.exports = sendChatMessage