import { Message } from "discord.js";
import { LanguageServiceMode } from "typescript";
import HydroCarbon from "../../..";
const {blue} = require('./.././../utility/hexColors')
import CommandClass from '../../classes/CommandClass'
const {randomHi, randomBye} = require('./.././../utility/gifs')

@leave.alias(['l'])

@leave.errorCheck([
    leave.CLIENT_NOT_IN_VC_ERR
])

export default class leave extends CommandClass {
    
    public async commandMain(message: Message, client: HydroCarbon) {
        message.guild.me.voice.channel.leave()
        //message.react('👋')


        /*
        const sentMessage = await message.channel.send(randomBye())

        setTimeout(() => {
            sentMessage.delete()
        }, 5000)
        */
    }
}


