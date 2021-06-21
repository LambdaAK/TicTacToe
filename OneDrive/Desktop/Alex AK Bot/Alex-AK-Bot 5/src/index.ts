

// add an alias option for commands where the command can have multiple names

import { Client, Guild, GuildMember, Message, VoiceState } from "discord.js";

export {}

import Discord = require('discord.js');


import help from './components/commands/misc/help'
import play from './components/commands/music/play'
import stop from './components/commands/music/stop'
import skip from './components/commands/music/skip'
import queue from './components/commands/music/queue'
import skipvote from './components/commands/music/skipVote'
import clear from './components/commands/misc/clear'
import restart from './components/commands/music/restart'
import join from './components/commands/music/join'
import leave from './components/commands/music/leave'
import gif from './components/commands/misc/gif'
import loop from './components/commands/music/loop'
import pt from './components/commands/chemistry/pt'
import ion from './components/commands/chemistry/ion'
import meme from './components/commands/misc/meme'

import mute from './components/commands/staff/mute'
import unmute from './components/commands/staff/unmute'
import tempmute from './components/commands/staff/tempmute'
import tempmutevc from './components/commands/staff/tempmutevc'
import helpstaff from './components/commands/staff/helpstaff'

import bal from './components/commands/currency/bal'
import walletcreate from './components/commands/currency/walletcreate'
import mine from './components/commands/currency/mine'

import report from './components/commands/misc/report'
import hack from "./components/commands/currency/hack";


//const discordButtons = require('discord-buttons')



export default class HydroCarbon extends Discord.Client {
    private handleVoiceStateUpdate = require('./components/events/handleVoiceStateUpdate')

    // property declarations
    public TEXT_CHANNEL_COMMANDS;
    public DM_COMMANDS;
    public PREFIX;
    public TOKEN;
    public queueMap;
    // /property declarations


    constructor() {
        super()

    
        this.TEXT_CHANNEL_COMMANDS = [
            help,
            play,
            stop,
            queue,
            skip,
            loop,
            restart,
            clear,
            //skipvote,
            join,
            leave,
            gif,
            pt,
            ion,
            mute,
            unmute,
            tempmute,
            tempmutevc,
            helpstaff,
            meme,
            bal,
            walletcreate,
            mine,
            report,
            hack
        ]

        this.DM_COMMANDS = [
            help,
            pt,
            ion,
            helpstaff,
        ]
        

        this.PREFIX = '%'
        this.queueMap = new Map()
        this.TOKEN = undefined
        
        // EVENTS
        this.once('ready', () => {
            console.log("[Online]")
        })



        this.on('message', async(message: Message) => {
            //try {
                // yes channel
                /**/if (message.channel.id == '848339886251442227') {
                    this.handleMessageInYesChannel(message)
                    return;
                }
                
                



               this.handleMessage(message) 
        })

        this.on('voiceStateUpdate', (oldState: VoiceState, newState: VoiceState) => this.handleVoiceStateUpdate(oldState, newState, this))

        this.loginWithToken()

    }

    private mostRecentYes: GuildMember;
    async handleMessageInYesChannel(message: Message) {
        if (message.content != "Yes") {
            try {
                message.delete()
            } catch {}

        }

        else if (this.mostRecentYes == message.member) try {
            message.delete()
        } catch {}
        
        else this.mostRecentYes = message.member
    }
    
    

    async loginWithToken() {
        //const token = fs.readFileSync('components/data/token.txt', 'utf-8')
        this.login(require('./../data/token.json'))
    }

    // Command handlers
    async handleMessage(message: Message) {


      if (message.channel.type === 'text') this.handleMessageFromTextChannel(message)
      //else if (message.channel.type === 'dm') this.handleMessageFromDMChannel(message)
    }

    async handleMessageFromTextChannel(message: Message) {
      if (message.content.startsWith(this.PREFIX)) {

          const commandSent = message.content.replace(this.PREFIX, '').toLowerCase()
          for (let i= 0; i < this.TEXT_CHANNEL_COMMANDS.length; i++) {
              let command = this.TEXT_CHANNEL_COMMANDS[i]
              if (commandSent.split(' ')[0] == command.name) {
                  //setTimeout( async () => {
                      //await message.delete()
                  //}, 500)
          
                  //message.delete()
                  command.prototype.commandMain(message, this)
                  //addReactionBasedOnError(message, errBool)
                      
              }
            
              // checks for an alias usage
              for (let i = 0; i < command.aliases.length; i++) {
                  let alias = command.aliases[i]
                    if (commandSent.split(' ')[0] == alias) {
                        command.prototype.commandMain(message, this)
                    }
              }
          }
      }
    }
    async handleMessageFromDMChannel(message: Message) {


      if (message.content.startsWith(this.PREFIX)) {
          const commandSent = message.content.replace(this.PREFIX, '').toLowerCase()
          for (let i= 0; i < this.DM_COMMANDS.length; i++) {
              let command = this.DM_COMMANDS[i]
              if (commandSent.split(' ')[0] == command.name) {
                  // await message.delete()
                  command.prototype.commandMain(message, this)
                  //addReactionBasedOnError(message, errBool)
                  
              }

            // checks for an alias usage
            for (let i = 0; i < command.aliases.length; i++) {
                let alias = command.aliases[i]
                  if (commandSent.split(' ')[0] == alias) {
                      command.prototype.commandMain(message, this)
                  }
            }
          }
      }
    }
    // /Command handlers


    isPlaying(guild: Guild): boolean {
        if (guild.me.voice.connection.dispatcher == undefined || guild.me.voice.connection.dispatcher == null) return false
        else return true
    }

    inVoiceChannel(guild: Guild): boolean {
        if (guild.me.voice.connection == undefined || guild.me.voice.connection == null) return false
        else return true
    }

}

// Running the bot
const client: HydroCarbon|Client = new HydroCarbon();





