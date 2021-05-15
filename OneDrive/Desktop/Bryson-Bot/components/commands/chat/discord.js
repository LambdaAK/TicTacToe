const CommandClass = require('./../../superclasses/CommandClass')

class discord extends CommandClass {
    /**
     * 
     * @param {object} messageData 
     * @param {minecraft bot} bot 
     */
    constructor(messageData, bot) {
        super()
        this.sendChatMessage('join our discord!- zWKwub73z3',bot,messageData)
    }
}

module.exports = discord