const CommandClass = require('./../../superclasses/CommandClass')


class kill extends CommandClass{
    /**
     * 
     * @param {object} messageData 
     * @param {minecraft bot} bot 
     */
    constructor(messageData, bot) {
        super()
        this.issueCommand('suicide',bot)
    }
}

module.exports = kill