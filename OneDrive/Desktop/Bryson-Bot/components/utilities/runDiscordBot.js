const discord = require('discord.js')


/**
 * 
 * @param {minecraft bot} minecraftBot 
 */
async function runDiscordBot(minecraftBot) {
    const discordBot = new discord.Client()
    const token = require('discordBotLogin')['token']


    const BrysonPublicGuild = discordBot.guilds.cache.get('830624669030678590')
    const chatBridgeMessageChannel = BrysonPublicGuild.channels.cache.get('843202556842737674')


    minecraftBot.on('message', async message => {
        const messageType = deterermineMessageType(message)
        if (messageType == 'pm' || messageType == null) return
        const messageData = parseChat(message)
        
        chatBridgeMessageChannel.send(`<${messageData.author}> ${messageData.content}`)
    })



    discordBot.login(token)
}

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

module.exports = runDiscordBot