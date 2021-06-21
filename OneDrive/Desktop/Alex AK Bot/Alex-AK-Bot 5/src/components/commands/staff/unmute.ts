import { GuildMember, Message, TextChannel } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";



@unmute.errorCheck([
    unmute.MEMBER_ALREADY_UNMUTED_ERR
])

@unmute.role(unmute.STAFF)

export default class unmute extends CommandClass {
    async commandMain(message: Message, client: HydroCarbon) {
        const args = unmute.splitArgs(message)

        const playerId = args[1].substring(3).replace('>', '')
        console.log(playerId)

        const MUTED_ROLE = message.guild.roles.cache.get('825865649233461248')
        const victim: GuildMember = unmute.getMember(playerId, message.guild)


        if (unmute.memberIsHigherRole(message, client)) {
            message.guild.members.cache.get(playerId).roles.remove(MUTED_ROLE)
            unmute.sendEmbed(<TextChannel> message.channel, {
                title: `Unmuted ${victim.user.tag}.`,
                color: 'GREEN'
            })

            victim.user.createDM()
            .then(dmChannel => sendEmbed(dmChannel, {
            title: `You have been unmuted in ${victim.guild.name}.`,
            color: 'GREEN'
        }))
        }
        else sendEmbed(message.channel, {


            title: `You do not have permission to unmute ${victim.user.tag}, ${message.author.tag}.`,
            color: `#ff0000`,
            deleteTimeout: 5000
        })

        


    }

    static memberIsHigherRole(message: Message, client: HydroCarbon): boolean {
        const args = unmute.splitArgs(message)
        const playerId = args[1].substring(3).replace('>', '')
        console.log(playerId)
        const member = message.member
        const victimMember = message.guild.members.cache.get(playerId)

        const memberHighestRoleValue = member.roles.highest.rawPosition
        const victimHighestRoleValue = victimMember.roles.highest.rawPosition

        if (memberHighestRoleValue > victimHighestRoleValue) return true
        else return false

    } 
}