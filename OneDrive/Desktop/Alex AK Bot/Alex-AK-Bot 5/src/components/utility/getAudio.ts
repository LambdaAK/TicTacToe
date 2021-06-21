const ytdl = require('ytdl-core')
const {getInfo} = require('ytdl-core')

async function getYTDLStream(url: string) {
    const info = await getInfo(url)
    const seconds = info.videoDetails.lengthSeconds
    if (seconds == 0) return getLiveStream(url)
    else return getVideo(url)
}


function getVideo(url: string) {
    const stream = ytdl(url, {filter: "audioonly", highWaterMark:  1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 *1024 * 10 })
    return stream
}


function getLiveStream(url: string) {
    const stream = ytdl(url)
    return stream
}

export default getYTDLStream