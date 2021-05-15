const CommandClass = require('./../../superclasses/CommandClass')


class spawn extends CommandClass{
    /**
     * 
     * @param {object} messageData 
     * @param {minecraft bot} bot 
     */
    constructor(messageData, bot) {
        super()
        this.sendChatMessage('I am asking everyone here why there is no one coming to spawn? Are you all too pussy? Or are all of you like tyrannosaurus u only come with a stack of Egaps, eat all of them and die in 5 minutes to people who have been playing a week?',bot,messageData)
    }
}

module.exports = spawn