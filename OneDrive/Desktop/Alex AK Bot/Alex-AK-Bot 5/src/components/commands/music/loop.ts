import { Message } from "discord.js";
import HydroCarbon from "../../..";

import CommandClass from '../../classes/CommandClass'
const { CLIENT_NOT_IN_VC_ERR, PLAYING_SONG_ALREADY_LOOPING_ERR } = require('./../../classes/ErrorClass');
const sendEmbed = require('./../../utility/embeds/sendEmbed');
const { red, randomColor } = require('./../../utility/hexColors');



@loop.errorCheck([
    loop.CLIENT_NOT_IN_VC_ERR, 
    loop.PLAYING_SONG_ALREADY_LOOPING_ERR
])


export default class loop extends CommandClass { 
    
    public async commandMain(message: Message, client: HydroCarbon) {
        client.queueMap[message.guild.me.voice.connection.channel.id]['playing']['loop'] = true
        sendEmbed(message.channel, {
            title: `looping ${client.queueMap[message.guild.me.voice.connection.channel.id]['playing']['songName']}`,
            color: randomColor(),
            deleteTimeout: 5000,
        }) 
    }
}


