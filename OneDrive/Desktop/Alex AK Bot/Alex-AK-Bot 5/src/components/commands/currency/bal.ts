import { GuildMember, Message } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";
//import readJson from "../../utility/readJson";

const sendEmbed = require('./../../utility/embeds/sendEmbed')

const fs = require('fs')
//import readJson from "../../utility/readJson";



export default class bal extends CommandClass {
    async commandMain(message: Message, client: HydroCarbon) {
        const wallets: object = require('./../../../../data/wallets.json')
        console.log(wallets)
        const args = message.content.split(' ')
        args.shift()
        if (wallets[message.author.id] == undefined) sendEmbed(message.channel, {
            title: `${message.author.tag}, you do not have a wallet! You can make one using the walletcreate command.`,
            color: 'GREEN',
            deleteTimeout: 5000
        })

        
        else if (args.length == 0) sendEmbed(message.channel, {
            title: `${message.author.tag}'s balance is ${wallets[message.author.id]} BrysonCoin.`,
            color: 'GREEN',
            deleteTimeout: 5000
        })

        else if (args.length == 1) {
            const playerId = args[0].substring(3).replace('>', '')
            const member: GuildMember = bal.getMember(playerId, message.guild)

            const balance: Number|undefined = wallets[member.user.id]

            if (balance == undefined) sendEmbed(message.channel, {
                title: `${member.user.tag} does not have a wallet.`,
                color: 'GREEN',
                deleteTimeout: 5000
            })
            else sendEmbed(message.channel, {
                title: `${member.user.tag}'s balance is ${wallets[member.user.id]} BrysonCoin.`,
                color: 'GREEN',
                deleteTimeout: 5000
            })
        }
    }
}