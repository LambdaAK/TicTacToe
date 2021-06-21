import { VoiceBroadcast } from "discord.js";

async function onBroadcastFinish(broadcast: VoiceBroadcast, callback: Function) {
    const dispatcher = broadcast.dispatcher
    let streamTime: number = 0
    const interval = setInterval(() => {
        if (dispatcher.streamTime == streamTime) {
            clearInterval(interval)
            callback()
        }
        else streamTime = dispatcher.streamTime
    }, 100)
}


module.exports = onBroadcastFinish