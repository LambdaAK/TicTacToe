import { Message, StreamDispatcher, VoiceChannel, VoiceConnection } from "discord.js"

const sendNowPlayingEmbed = require('./embeds/sendNowPlayingEmbed')
const ytdl = require('discord-ytdl-core')
const checkQueueThenHandle = require('./checkQueueThenHandle.js')
export {}
async function playAudio(audio: any, voiceChannel: VoiceChannel, url: string, message: Message){
    
    const connection = await voiceChannel.join()
    let dispatcher: StreamDispatcher = null
    setTimeout(() => {
        dispatcher = connection.play(audio)
        dispatcher.on('finish', () => {
                checkQueueThenHandle(message, connection)
            })

        dispatcher.on('close', () => {
            console.log('dispatcher closed')
        })
    }, 2000) // used to be 5000
    
        
    // once the song has finished playing, handle the queue
    

    sendNowPlayingEmbed(url, message)
}

module.exports = playAudio