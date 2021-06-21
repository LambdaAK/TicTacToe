import { Message, MessageEmbed } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";

export default class helpstaff extends CommandClass {
    async commandMain(message: Message, client: HydroCarbon) {
        const embed = new MessageEmbed()

        .addField('mute <user>', 'mutes the user', false)
        .addField('unmute <user>', 'unmutes the user', false)
        .addField('tempmute <user> <duration>', 'temporarily mutes the member for the specified duration', false)
        .addField('tempmutevc <user> <duration>', 'temporarily vc mutes the user for the specifed duration', false)
        .setColor('GREEN')
        .setTimestamp()

        message.channel.send(embed)
    }
}


"BRYSON"