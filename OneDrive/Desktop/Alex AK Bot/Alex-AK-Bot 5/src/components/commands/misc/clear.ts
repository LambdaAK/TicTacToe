import { Message, TextChannel } from "discord.js";
import HydroCarbon from "../../..";

import CommandClass from '../../classes/CommandClass'
//const { quantativeRangeErrorMetaclass } = require('../classes/ErrorClass.js');
const sendEmbed = require('./../../utility/embeds/sendEmbed');
const {red, randomColor} = require('./../../utility/hexColors');


@clear.errorCheck([
    clear.QUANTATIVE_RANGE_ERR_1_1_100
])

@clear.role(clear.STAFF)

@clear.unStable

export default class clear extends CommandClass {
    static QUANTATIVE_RANGE_ERR_1_1_100 = clear.QUANTATIVE_RANGE_ERR_METACLASS('[Number of messages]', 1, 1, 100)
    

    // add the errors to check later
    

    public async commandMain(message: Message, client: HydroCarbon) {
        const args = clear.splitArgs(message)
    
        const num = Number(args[1])
    
        //const messages = message.client.channels.cache.get(message.channel.id);
    
        try {
            const channel: TextChannel = <TextChannel> message.channel
            await channel.bulkDelete(num, false)
            sendEmbed(message.channel, {
                title: `${num} messages cleared, ${message.author.tag}.`,
                color: randomColor(),
                deleteTimeout: 500
            })
            return false
        }
        catch {
            
        }
    
    } // commandMain()
}