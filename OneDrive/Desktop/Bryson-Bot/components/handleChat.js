const handleCommand = require("./handleCommand")
const handlePm = require("./handlePm")
const logMostRecentChat = require("./resources/mostRecentChatMessage.json")

/**
 * 
 * @param {string} message 
 * @param {minecraft bot} bot
 */
function handleChat(message, bot) {
    const messageType = deterermineMessageType(message)
    message = message.replace('~','')

    if (messageType == null) return

    if (messageType == 'chat'){ 
        let messageDict = parseChat(message)
        if(messageDict.content[0]=="!"){
            messageDict.content = messageDict.content.replace('!','')
            handleCommand(messageDict, bot)
        }
    }

    if(messageType == 'pm'){
        let messageDict = parsePm(message)
        handlePm(messageDict, bot)
    } 
}

/**
 * @param {string} content 
 * @returns string, type of message
 */
function deterermineMessageType(content){
    if(content.indexOf('<')!=-1 && content.indexOf('>')!= -1){
        return "chat"
    }
    else if(content.indexOf('[')!=-1&&content.indexOf(']')!=-1&&content.indexOf('-> me')!=-1){
        return 'pm'
    }
    else{
        return null
    }
}

/**
 * 
 * @param {string} message 
 */
function parseChat(message) {
    if(message.indexOf('[')!=-1&&message.indexOf(']')!=-1){
    const suffix = message.substring(message.indexOf('['),message.indexOf(']')+1)
    message= message.replace(suffix,'')
    }

    let data = {

    }
    // between the arrows
    
    data.author = message.substring(message.indexOf('<') + 1, message.indexOf('>'))
    data.content = message.substring(message.indexOf('>') + 2)
    
    while(data.content[0] == ' '){
        data.content = data.content.replace(' ','')
    }

    data.type = 'chat'
    return data
}

/**
 * 
 * @param {string} message 
 */

function parsePm(message){ 
    let data = {

    }
    data.author = message.substring(message.indexOf('[')+1,message.indexOf(' '))
    data.content = message.substring(message.indexOf(']') + 2)
    data.type = 'pm'
    return data
}

module.exports = handleChat