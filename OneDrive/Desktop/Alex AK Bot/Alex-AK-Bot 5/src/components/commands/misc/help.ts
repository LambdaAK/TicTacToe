import { Message } from "discord.js"
import HydroCarbon from "../../.."


const {MessageEmbed} = require('discord.js')
//const CommandClass = require('../classes/CommandClass')
import CommandClass from '../../classes/CommandClass'
export {}



@help.alias(['h'])

export default class help extends CommandClass {
    
    public async commandMain(message: Message, client: HydroCarbon) {

        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Usage Info`)
        .addField('%play <url/keywords>', 'plays a youtube video from url or keywords')
        .addField('%stop', 'stops whatever song the bot is playing and clears the queue')
        .addField('%skip', 'skips the current song')
        .addField('%skipvote', 'creates a vote to skip the current song')
        .addField('%queue', 'displays the song queue')
        .addField('%help', 'this command')
        .addField('%loop', 'sets the current playing song to loop')
        .addField('%restart', 'restarts the current playing song')
        .addField('%gif <keywords>', 'sends a gif according to the keywords provided')
        .addField('%meme', 'sends a random meme')
        .addField('%helpstaff', 'shows the staff commands')
        .addField('%walletcreate', 'creates a wallet for BrysonCoin')
        .addField('%bal <?user>', 'shows BrysonCoin balance for you or another member')
        .addField('%mine', 'you mine 0.00001 BrysonCoin')
        .setTimestamp()

        const messageSent = await message.channel.send(embed)
        setTimeout(() => {
            if (!messageSent['deleted']) messageSent.delete()
        }, 5000)

        
        return false
    }
}

