const CommandClass = require('./../../superclasses/CommandClass')


class ping extends CommandClass{
    /**
     * 
     * @param {object} messageData 
     * @param {minecraft bot} bot 
     */
    constructor(messageData, bot) {
        super()
        const isNicked = this.denyCommand(messageData,bot)
        if(isNicked) return
        
        const playerDict = bot.players
        const ping = playerDict[messageData.author]['ping']
        this.sendChatMessage(`${messageData.author}, your ping is ${ping}.`, bot, messageData)
    }
}

module.exports = ping