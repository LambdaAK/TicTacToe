import { Message } from "discord.js"
import HydroCarbon from "../../.."

export {}
const textFormatting = require('./../../utility/textFormatting')
const sendEmbed = require('./../../utility/embeds/sendEmbed')
const {red, green, lightBlue} = require('./../../utility/hexColors')
import CommandClass from '../../classes/CommandClass'
 




@stop.errorCheck([
    stop.CLIENT_NOT_IN_VC_ERR, 
    stop.CLIENT_NOT_PLAYING_ANYTHING_ERR
])

export default class stop extends CommandClass { 

    
    public async commandMain(message: Message, client: HydroCarbon) {

            // clear the server's queue
            client.queueMap.delete(message.guild.me.voice.connection.channel.id)
            message.guild.me.voice.connection.dispatcher.destroy()
            // send the embed
            sendEmbed(message.channel, {
                color: lightBlue,
                title: `I stopped playing, ${message.author.tag}.`,
                deleteTimeout: 5000,
            })
    
            return false
            
            
        
        
    }
}


