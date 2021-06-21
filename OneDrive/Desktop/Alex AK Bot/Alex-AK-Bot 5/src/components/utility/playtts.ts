import { Message, VoiceChannel } from "discord.js";
import HydroCarbon from "../..";

const discordTTS = require('discord-tts');

function playtts(text: string, client: HydroCarbon) {
    // check this
    const broadcast = client.voice.createBroadcast();
    broadcast.play(discordTTS.getVoiceStream(text));
}

module.exports = playtts