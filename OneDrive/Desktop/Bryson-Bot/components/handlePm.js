const sendDefaultMessage = require('./commands/pm/sendDefaultMessage')

const commands = [sendDefaultMessage]

/**
 * 
 * @param {object} messageData 
 * @param {minecraft bot} bot 
 */
function handlePm(messageData, bot) {
    new sendDefaultMessage(messageData, bot)
}

module.exports = handlePm