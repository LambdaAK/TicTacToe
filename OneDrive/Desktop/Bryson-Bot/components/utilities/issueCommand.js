function issueCommand(message, bot) {
    bot.chat(`/${message}`)
}

module.exports = issueCommand