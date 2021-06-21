import { GuildMember } from "discord.js";
import { Message } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass"
const sendEmbed = require('./../../utility/embeds/sendEmbed')
const fs = require('fs')


@mine.memberCooldown(60000)
export default class mine extends CommandClass {


    public static mostRecentMine: object = []


    async commandMain(message: Message, client: HydroCarbon) {


        // check if the message author is allowed to mine
        /*if (!mine.checkIfMiningIsAllowed(message.author.id)) {
            sendEmbed(message.channel, {
                title: `${message.author.tag}, you are on mining cooldown.`,
                color: 'RED',
                deleteTimeout: 5000
            })
            return;
        }
        */

        const wallets: object = require('./../../../../data/wallets.json')
        if (wallets[message.author.id] == undefined) sendEmbed(message.channel, {
            title: `${message.author.tag}, you do not have a wallet! You can make one using the walletcreate command.`,
            color: 'GREEN',
            deleteTimeout: 5000
        })
        else {
            wallets[message.author.id] += 100
            const logPath = require('path').resolve(__dirname, './../../../../data/wallets.json')
            const jsonString: string = JSON.stringify(wallets)
            fs.writeFile(logPath, jsonString, err => {
                if (err) {
                  console.error(err)
                  return
                }
                //file written successfully
            })

            sendEmbed(message.channel, {
                title: `${message.author.tag} mined 0.00001 BrysonCoin!`,
                color: 'GREEN',
                deleteTimeout: 5000
            })

            mine.mostRecentMine[message.author.id] = Date.now()

        
        }
    }

    public static checkIfMiningIsAllowed(messageAuthorId: string): boolean {
        const lastMineTime: number|undefined = mine.mostRecentMine[messageAuthorId] // could be undefined

        if (lastMineTime == undefined) return true
        const difference = Date.now() - lastMineTime

        if (difference >= 60000) return true
        else return false
    }
}