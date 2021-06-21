module.exports = createFileDownloadPromise

const youtubedl = require("youtube-dl")
const fs = require('fs')



// implement the reject function later
function createFileDownloadPromise(url: string) : Promise<void>
{
  return new Promise(function(resolve, reject) {
    try {
      const video = youtubedl(url,  ['-x'], { cwd: __dirname })
      video.pipe(fs.createWriteStream('components/audio/audio.mp3')).on('finish', resolve)
    }
    finally{
      reject()
    }
  })
}




