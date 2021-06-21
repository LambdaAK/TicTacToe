import { Message } from "discord.js"

const {FINGER_CIRCLE,X} = require("./reactions")

function addReactionBasedOnError(message: Message, errBool: boolean) {
    // message: Discord.Message
    // errBool: bool
    console.log(errBool)
    if (errBool === false) message.react(FINGER_CIRCLE)
    else if (errBool === true) message.react(X)


}

module.exports = addReactionBasedOnError