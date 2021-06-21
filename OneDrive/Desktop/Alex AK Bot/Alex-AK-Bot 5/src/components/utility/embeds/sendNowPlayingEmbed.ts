import { Message } from "discord.js"

const {MessageEmbed} = require('discord.js')
const {getInfo} = require('ytdl-core')
const textFormatting = require('../textFormatting')
const getYoutubeVideoThumbnail = require('../getYoutubeVideoThumbnail')
const {randomColor} = require('../hexColors')
const { green, bold, orange, yellow } = require('../textFormatting')

import getAudio from "./../getAudio"

export {}
// make this an async function to avoid having to declare the promise
async function createNowPlayingEmbedPromise(url: string, message: any /*discord.Message*/) {
    
    const info = await getInfo(url)
    let nowPlayingEmbed = new MessageEmbed()

    const lengthSeconds = info.videoDetails.lengthSeconds
    const minutes = Math.floor(info.videoDetails.lengthSeconds/60)
    const seconds = info.videoDetails.lengthSeconds-Math.floor(info.videoDetails.lengthSeconds/60)*60

    let timeToDisplay;
    if (lengthSeconds == 0) timeToDisplay = "livestream"
    else {
        // add an extra 0 if the seconds are < 10
        if (seconds < 10) timeToDisplay = `${minutes}:0${seconds}`
        else timeToDisplay = `${minutes}:${seconds}`
    } 
    
    const author = message.client.queueMap[message.guild.id].playing.author.tag
    nowPlayingEmbed
    .setColor(randomColor())
    .setTitle(`Now Playing: ${info['videoDetails']['title']}`)
    .setURL(url)
    .addField(`${author}`, `${green(timeToDisplay)}`)
    .setImage(getYoutubeVideoThumbnail(url))
    .setTimestamp()
            
    return nowPlayingEmbed
   
}

async function sendNowPlayingEmbed(url: string, message: Message) {
    const nowPlayingEmbed = await createNowPlayingEmbedPromise(url, message)
    message.channel.send(nowPlayingEmbed)
}

module.exports = sendNowPlayingEmbed
