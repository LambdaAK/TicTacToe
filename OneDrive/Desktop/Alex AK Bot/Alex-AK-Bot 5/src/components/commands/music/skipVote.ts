import { Message } from "discord.js";
import HydroCarbon from "../../..";

export {}
const { MessageEmbed } = require('discord.js');
const checkQueueThenHandle = require('./../../utility/checkQueueThenHandle')
const sendEmbed = require('./../../utility/embeds/sendEmbed')
const {makeEmbed} = require('./../../utility/embeds/makeEmbed')
const {red, orange, lightBlue} = require('./../../utility/hexColors');
import CommandClass from '../../classes/CommandClass'
const { CLIENT_NOT_IN_VC_ERR } = require('./../../classes/ErrorClass');

// C:/Users/alexk/Desktop/coding projects/bryson/bryson bot 9/src/components/utility/checkQueueThenHandle.js


@skipvote.errorCheck([
    skipvote.CLIENT_NOT_IN_VC_ERR
])

export default class skipvote extends CommandClass { 
    calculateResult(message: Message, client: HydroCarbon) {
        let yesCount = message.reactions.cache.get("✔️").count - 1
        let noCount = message.reactions.cache.get("❌").count - 1
    
        if (yesCount > noCount) this.skipSong(message, client, yesCount, noCount)
        else this.dontSkip(message, client, yesCount, noCount)
        // message is a Discord.message (the one where the reactions are for the vote)
    }

    skipSong(message: Message, client: HydroCarbon, yesCount: number, noCount: number) {

        message.edit(makeEmbed({
            title: `${yesCount} people voted yes and ${noCount} voted no. Skipping ${client.queueMap[message.guild.me.voice.channel.id]['playing']['songName']}`,
            color: lightBlue,
        }))
        
        client.queueMap[message.guild.me.voice.connection.channel.id].playing.loop = false
        message.guild.me.voice.connection.dispatcher.destroy()
        checkQueueThenHandle(message, message.guild.me.voice.connection)
    
    }

    dontSkip(message: Message, client: HydroCarbon, yesCount: number, noCount: number) {
        message.edit(makeEmbed({
            title: `${yesCount} people voted yes and ${noCount} voted no. Not enough people voted to skip ${client.queueMap[message.guild.me.voice.channel.id]['playing']['songName']}`,
            color: lightBlue,
        }))
    }

    public async commandMain(message: Message, client: HydroCarbon) {
            // send the skip message
        const votingMessage = await sendEmbed(message.channel, {
            title: `Skip \"${client.queueMap[message.guild.me.voice.channel.id]['playing']['songName']} requested by ${message.author.tag}. Vote will be counted in 15 seconds.`,
            color: orange,
            deleteTimeout: 20000,
        })

        // In 15 seconds, tally the votes
            
            // add the reactions
        votingMessage.react("✔️")
        votingMessage.react("❌")
            

        setTimeout(() => {
            votingMessage.edit(
                makeEmbed({
                    title: `Skip \"${client.queueMap[message.guild.me.voice.channel.id]['playing']['songName']} requested by ${message.author.tag}. Vote will be counted in 5 seconds.`,
                    color: orange,
                })
            )
        }, 10000)



        setTimeout(() => {
            this.calculateResult(votingMessage, client)
        }, 15000)
        
        return false
    }
}


