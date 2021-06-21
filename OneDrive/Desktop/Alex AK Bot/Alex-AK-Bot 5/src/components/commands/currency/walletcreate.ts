import { Message } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";
import readJson from "../../utility/readJson";

const sendEmbed = require('./../../utility/embeds/sendEmbed')

const fs = require('fs')

export default class walletcreate extends CommandClass {
    async commandMain(message: Message, client: HydroCarbon) {

        //const walletsPath = require('path').resolve(__dirname, './../../../../data/wallets.json')

        const wallets: object = require('./../../../../data/wallets.json')

        console.log(wallets)

        if (wallets[message.author.id] != undefined) sendEmbed(message.channel, {
            title: `You already have a wallet, ${message.author.tag}.`,
            color: 'GREEN',
            deleteTimeout: 5000
        })
        else {
            wallets[message.author.id] == 10000
            Object.assign(wallets, {[message.author.id]: 10000});
            
            const jsonString: string = JSON.stringify(wallets)
            
            //write the data
            console.log(jsonString)
            const logPath = require('path').resolve(__dirname, './../../../../data/wallets.json')
            console.log(logPath)
            fs.writeFile(logPath, jsonString, err => {
                if (err) {
                  console.error(err)
                  return
                }
                //file written successfully
            })

            sendEmbed(message.channel, {
                title: `Wallet created, ${message.author.tag}!`,
                color: 'GREEN',
                deleteTimeout: 5000
            })
        }

        
    }
}