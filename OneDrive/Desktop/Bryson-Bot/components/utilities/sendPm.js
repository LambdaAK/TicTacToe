function sendPm(reciever, message, bot) {
    bot.chat(`/msg ${reciever} ${message}`)
}

module.exports = sendPm