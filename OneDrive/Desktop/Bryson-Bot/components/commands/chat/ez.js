const CommandClass = require('./../../superclasses/CommandClass')

class ez extends CommandClass{
    /**
     * 
     * @param {object} messageData 
     * @param {minecraft bot} bot 
     */
    constructor(messageData, bot) {
        super()
        this.sendChatMessage('EZZZZZZZZZZZZZZZZZZZZZZZZZ',bot,messageData)
    }
}

module.exports = ez