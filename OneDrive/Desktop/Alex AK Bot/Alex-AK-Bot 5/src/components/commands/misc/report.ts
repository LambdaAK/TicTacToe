import { Message } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";

const sendEmbed = require('./../../utility/embeds/sendEmbed')


@report.errorCheck([report.MISSING_ARGS_ERR_3])
export default class report extends CommandClass {

    static MISSING_ARGS_ERR_3 = report.MISSING_ARGS_ERR_METACLASS(3)

    async commandMain(message: Message, client: HydroCarbon) {
        const args = report.splitArgsWithoutCommandCall(message)
        const playerName = args[0]
        let reason: string = ''
        for (let i = 1; i < args.length; i++) {
            reason = `${reason} ${args[i]}`
        }

        sendEmbed(message.channel, {
            title: `${playerName} has been reported for ${reason}. Staff will deal with this soon.`,
            color: 'RED',
        })
    }
}