import { Message } from "discord.js";
import HydroCarbon from "../../../index";
import CommandClass from '../../classes/CommandClass'

const sendEmbed = require('./../../utility/embeds/sendEmbed');
const {lightBlue} = require('./../../utility/hexColors');
const {randomColor} = require('./.././../utility/hexColors')

export {}

@queue.alias(['q'])

@queue.errorCheck([
    queue.CLIENT_NOT_IN_VC_ERR, 
    queue.CLIENT_NOT_PLAYING_ANYTHING_ERR
])

export default class queue extends CommandClass { 
    public async commandMain(message: Message, client: HydroCarbon) {

        console.log('queue.commandMain')

        const playing = client.queueMap[message.guild.id]['playing'] // dict
        const serverQueue = client.queueMap[message.guild.id]['queue'] // array

        // make fields
        // add the playing song, immediately
        let fields = [{
            name: 'Currently playing',
            value: playing['songName']
        }]
        
        // add the rest of the queue
        for (let i = 0; i < serverQueue.length; i++) {
            fields.push({
                name: `${i + 2}:`,
                value: serverQueue[i]['songName']
            })
        }

        // if there is a leading element in serverQueue, change the name
        if (fields[0] != undefined && fields[0] != null) {
            fields[0]['name'] = 'Currently Playing:'
        }

        sendEmbed(message.channel, {
            title: '** [Queue] **',
            color: randomColor(),
            fields: fields,
            deleteTimeout: 5000,
        })

        return false
    }
}

