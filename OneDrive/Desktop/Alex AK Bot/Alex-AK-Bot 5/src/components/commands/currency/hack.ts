import { GuildMember, Message, TextChannel } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";

const sendEmbed = require('./../../utility/embeds/sendEmbed')

@hack.errorCheck([hack.MISSING_ARGS_ERR_2])

//1 hour
@hack.memberCooldown(3600000)
export default class hack extends CommandClass {
    static MISSING_ARGS_ERR_2 = hack.MISSING_ARGS_ERR_METACLASS(2)
    


    async commandMain(message: Message, client: HydroCarbon) {

        const args = hack.splitArgsWithoutCommandCall(message)

        const playerId = args[0].substring(3).replace('>', '')

        // check if playerId == message.author.id
        if (message.author.id == playerId) {
            sendEmbed(message.channel, {
                title: `You cannot hack yourself, ${message.author.tag}.`,
                color: 'RED',
                deleteTimeout: 5000
            })
            return;
        }

        const member: GuildMember = hack.getMember(playerId, message.guild)

        let amountToSteal: number;
        amountToSteal = 100

        if (member == undefined || member == null) hack.sendEmbed(<TextChannel> message.channel, {
            title: `No user found.`,
            color: 'RED',
            deleteTimeout: 5000
        })

        hack.stealCoin(message.author.id, playerId, amountToSteal)

        sendEmbed(message.channel, {
            title: `${message.author.tag} stole ${amountToSteal} BrysonCoin from ${member.user.tag}!`,
            color: 'RED',
            deleteTimeout: 10000
        })

        


    }
}