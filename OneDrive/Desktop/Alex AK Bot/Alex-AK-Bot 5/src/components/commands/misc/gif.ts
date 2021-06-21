import { Message } from "discord.js";
import HydroCarbon from "../../..";

const Tenor = require("tenorjs").client({
    "Key": 'C6NWL8O6EVFW', // https://tenor.com/developer/keyregistration
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});

import CommandClass from '../../classes/CommandClass'


@gif.errorCheck([
    gif.MISSING_ARGS_ERR_2
])

export default class gif extends CommandClass {

    static fetch = require('node-fetch')
    static MISSING_ARGS_ERR_2 = gif.MISSING_ARGS_ERR_METACLASS(2)

    public async commandMain(message: Message, client: HydroCarbon) {
        const argsList = message.content.split(' ')
        let keywords: string = ""


        for (let i = 1; i < argsList.length; i++) keywords = `${keywords} ${argsList[i]}`



                const results = await Tenor.Search.Query(keywords, "1")
                results.forEach(post => {
                    message.channel.send(post['itemurl'])
                    console.log(post['itemurl'])
                });   
    }
}

