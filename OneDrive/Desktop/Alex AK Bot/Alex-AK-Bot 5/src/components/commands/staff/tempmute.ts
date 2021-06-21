import { GuildMember, Message, TextChannel } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";



@tempmute.errorCheck([
    /*tempmute.MEMBER_ALREADY_MUTED_ERR,*/
    tempmute.MISSING_ARGS_ERR_3
])

@tempmute.role(tempmute.STAFF)

export default class tempmute extends CommandClass {



    static MISSING_ARGS_ERR_3 = tempmute.MISSING_ARGS_ERR_METACLASS(3)

    async commandMain(message: Message, client: HydroCarbon) {
        const args = tempmute.splitArgs(message)

        const playerId = args[1].substring(3).replace('>', '')
        console.log(playerId)

        const duration = Number(args[2]) * 1000
        const victim: GuildMember = tempmute.getMember(playerId, message.guild)
        const MUTED_ROLE = message.guild.roles.cache.get('825865649233461248')

        if (tempmute.memberIsHigherRole(message, client)) {
            message.guild.members.cache.get(playerId).roles.add(MUTED_ROLE)
            tempmute.sendEmbed(<TextChannel> message.channel, {
                title: `Muted ${victim.user.tag} for ${duration/1000} seconds.`,
                color: '#ff0000'
            })
            victim.user.createDM()
            .then(dmChannel => sendEmbed(dmChannel, {
                title: `You have been temporarily muted for ${duration} seconds in ${victim.guild.name}.`,
                color: '#ff0000'
            }))
            await tempmute.sleep(duration)
            message.guild.members.cache.get(playerId).roles.remove(MUTED_ROLE)
        }
        else tempmute.sendEmbed(<TextChannel> message.channel, {
            title: `You do not have permission to tempmute ${victim.user.tag}, ${message.author.tag}.`,
            color: `#ff0000`,
            deleteTimeout: 5000
        })
 
    }

    /**
     * 
     * @param duration duration in milliseconds
     * @returns Promise<null>
     */
    static sleep(duration: number) {
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve(null)
            }, duration)
        })
    }


    static memberIsHigherRole(message: Message, client: HydroCarbon): boolean {
        const args = tempmute.splitArgs(message)
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