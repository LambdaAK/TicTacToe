const CommandClass = require('./../../superclasses/CommandClass')

class coords extends CommandClass {
    /**
     * 
     * @param {object} messageData 
     * @param {minecraft bot} bot 
     */
    constructor(messageData, bot) {
        super()
        var pos = bot.player.entity['position']

        pos = Math.round(pos['x']) + " " + Math.round(pos['z'])
        
        this.sendChatMessage(`I am at ${pos}`,bot,messageData)
    }
}

module.exports = coords