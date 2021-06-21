const fs = require('fs')

export default function readJson(dir: string): Promise<object> {
    return new Promise((resolve, reject) => {
        fs.readFile(dir, 'utf-8', (err, jsonString) => {
            console.log(jsonString)
            const data = JSON.parse(jsonString);
            resolve(data)
    
        })
    })
}