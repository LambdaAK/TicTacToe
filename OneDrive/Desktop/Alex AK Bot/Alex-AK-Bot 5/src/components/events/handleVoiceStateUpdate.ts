import { Client, GuildMember, Message, StreamDispatcher, VoiceChannel, VoiceState } from "discord.js"
import HydroCarbon from "../.."
const discordTTS = require('discord-tts');
const onBroadcastFinish = require('./../utility/onBroadcastFinish')



const playtts = function (text: string, client: HydroCarbon): void {
    // check this
    const broadcast = client.voice.createBroadcast();
    broadcast.play(discordTTS.getVoiceStream(text));
}

async function handleVoiceStateUpdate(oldState: VoiceState, newState: VoiceState, client: HydroCarbon|Client): Promise<void> {
    /*const member = newState.member
    const clientInGuild = newState.guild.me

    if (member != clientInGuild) return
    if (newState.channel == null) return
    if (oldState.channel != newState.channel) clientInGuild.voice.channel.leave()
    */
}



module.exports = handleVoiceStateUpdate