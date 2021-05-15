const mineflayer = require('mineflayer');
const fs = require('fs');
// imports
const handleChat = require('./components/handleChat')
const login = require('./login.json')
const sendChatMessage = require("./components/utilities/sendChatMessage");
const sendPm = require('./components/utilities/sendPm');
const logMostRecentChatMessage = require('./components/utilities/logMostRecentChat');
// / imports

// Bot declaration
let bot;
bot = mineflayer.createBot({
    host: login.server,
    port: login.port,
    username: login.username,
    password: login.password,
    version: false,
    auth: 'microsoft'
});

bot.on('kicked', (reason, loggedin) => {
  setTimeout(() => {
    bot = mineflayer.createBot({
    host: login.server,
    port: login.port,
    username: login.username,
    password: login.password,
    version: false,
    auth: 'microsoft'
    });
  }, 5000) 
})
// / Bot declaration

// welcome message
const welcome = () => {
  sendChatMessage("Hello Nether Anarchy, I'm bryson bot! Use \"!help\" to see my commands.",bot)
};
bot.once('spawn', (welcome));
// / welcome message

// when a message is sent
bot.on('message', async message =>  {
  handleChat(message.toString(), bot)
  console.log(message.toString())
  if(message.toString().indexOf("was slain by SonyTV")!=-1){
    sendChatMessage("ez kill!",bot)
  }

  if(message.toString().indexOf('before sending another message!')!= -1){
    let rawdata = fs.readFileSync('./components/resources/mostRecentChatMessage.json');
    let log = JSON.parse(rawdata);
    const reciever = Object.keys(log)[0]
    const messageToSend = Object.values(log)[0] + " (sent as message for anti spam)"
    sendPm(reciever, messageToSend, bot)
  }

  if(message.toString().indexOf('[me ->')!=-1){
    logMostRecentChatMessage({author: "*"},"filler")
  }
})
// / when a message is sent


// every 5 minutes, send a message into the chat
setInterval(() => {
  sendChatMessage("Hello Nether Anarchy, I'm BrysonBot! Use \"!help\" to see my commands.",bot)
},300000); // Every 5 min

// / every 5 minutes. send a message into the chat

// discord chat bridge
setTimeout(async () => {
  runDiscordBot()
}, 5000)

const discord = require('discord.js')

async function runDiscordBot() {
    const discordBot = new discord.Client()
    const token = require('./discordBotLogin.json')['token']
    await discordBot.login(token)

    const chatBridgeMessageChannel = await discordBot.channels.fetch('843202556842737674')

    bot.on('message', async message => {
        chatBridgeMessageChannel.send(message.toString())
    })



    
}

function deterermineMessageType(content){
    if(content.indexOf('<')!=-1 && content.indexOf('>')!= -1){
        return "chat"
    }
    else if(content.indexOf('[')!=-1&&content.indexOf(']')!=-1&&content.indexOf('-> me')!=-1){
        return 'pm'
    }
    else{
        return null
    }
}

function parseChat(message) {
    if(message.indexOf('[')!=-1&&message.indexOf(']')!=-1){
    const suffix = message.substring(message.indexOf('['),message.indexOf(']')+1)
    message= message.replace(suffix,'')
    }

    let data = {

    }
    // between the arrows
    
    data.author = message.substring(message.indexOf('<') + 1, message.indexOf('>'))
    data.content = message.substring(message.indexOf('>') + 2)
    
    while(data.content[0] == ' '){
        data.content = data.content.replace(' ','')
    }

    data.type = 'chat'
    return data
}
// / discord chat bridge