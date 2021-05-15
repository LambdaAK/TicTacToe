const sendPm = require('../../utilities/sendPm')
const CommandClass = require('./../../superclasses/CommandClass')

class sendDefaultMessage extends CommandClass{
    /**
     * 
     * @param {object} messageData 
     * @param {minecraft bot} bot 
     */
    constructor(messageData, bot) {
        super()
        sendPm(messageData.author,'SHUT UP LEAVE ME ALONE',bot)
    }
}

module.exports = sendDefaultMessage