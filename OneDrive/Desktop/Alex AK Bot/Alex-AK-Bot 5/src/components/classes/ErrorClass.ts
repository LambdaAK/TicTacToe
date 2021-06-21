/* 

This file contains an ErrorClass which is extended into error classes.
Also, it contains various error classes that are used throughout this project.
Any error that is used often should appear here.

*/

import { DMChannel, Message, NewsChannel, TextChannel } from 'discord.js'

const sendEmbed = require("../utility/embeds/sendEmbed")

const {red} = require("./../utility/hexColors")

export abstract class ErrorClass {
    getCommandName(message: Message) {
        const unCutCommand = message.content.split(' ')[0]
        const commandName = unCutCommand.substring(1, unCutCommand.length)

        return commandName
    }

    splitArgs(message: Message) {
        return message.content.split(' ')
    }

    
    sendErrMessage(channel: TextChannel | NewsChannel | DMChannel, errMessage: string) {
        sendEmbed(channel, {
            title: errMessage,
            color: '#FFA500',
            deleteTimeout: 5000

        })
    }

    
    abstract checkPresence(message: Message): boolean
    abstract standardHandle(message: Message): void
    

    //checkPresence(message) {}
    //standardHandle(message){}
    /*execute(message){
        if (this.checkPresence(message)) this.standardHandle(message)
    }*/

}
//////////////////////////////////////////////////////////////////////////////////
export class CLIENT_NOT_IN_VC_ERR extends ErrorClass {

    
    
    checkPresence(message: Message) {
        console.log('client not in vc err checking')


        if (message.guild.me.voice.channel == undefined || message.guild.me.voice.channel == null) return true
        else return false
    }

    standardHandle(message: Message) {
        console.log('not in vc')

        const commandName = this.getCommandName(message)
        this.sendErrMessage(message.channel, `I must be in a voice channel to use the ${commandName} command, ${message.author.tag}.`)
    }


}


export class MEMBER_NOT_IN_VC_ERR extends ErrorClass {

    
    
    checkPresence(message: Message) {

        if (message.member.voice.channel == undefined || message.member.voice.channel == null) return true
        else return false
    }

    standardHandle(message: Message) {
        const commandName = this.getCommandName(message)
        this.sendErrMessage(message.channel, `You must be in a voice channel to use the ${commandName} command, ${message.author.tag}.`)
    }


}




export function MISSING_ARGS_ERR_METACLASS(minArgs: number) {
    // minArgs: int. The minimum number of arguments desired by a function
    class MISSING_ARGS_ERR extends ErrorClass {

        checkPresence(message: Message) {
    
            const args = message.content.split(' ')
    
            if (args.length < minArgs) return true
            else return false
            
        }
    
        standardHandle(message: Message) {
            const commandName = this.getCommandName(message)
            // if numArgs - 1 == 1, we want to say "argument" not "arguments". That's the reason for the if/else block
            if (minArgs - 1 == 1) this.sendErrMessage(message.channel, `You must provide at least ${minArgs - 1 } argument to use the ${commandName} command, ${message.author.tag}.`)
            else this.sendErrMessage(message.channel, `You must provide at least ${minArgs - 1 } arguments to use the ${commandName} command, ${message.author.tag}.`)
            
            
        }
    
    
    }

    return MISSING_ARGS_ERR
}

export class CLIENT_NOT_PLAYING_ANYTHING_ERR extends ErrorClass {

    checkPresence(message) {
        console.log('client not playing anything err checking')
        if (message.guild.me.voice.connection.dispatcher == undefined || message.guild.me.voice.connection.dispatcher == null) return true
        else return false
        
    }

    standardHandle(message) {
        console.log('not playing anything')
        
        const commandName = this.getCommandName(message)
        this.sendErrMessage(message.channel, `I am not playing anything, ${message.author.tag}. I must be playing something for you to use the ${commandName} command.`)  
    }


}

export class PLAYING_SONG_ALREADY_LOOPING_ERR extends ErrorClass {

    checkPresence(message) {
        if (message.client.queueMap[message.guild.me.voice.connection.channel.id]['playing']['loop'] === true) return true
        else return false
        
    }

    standardHandle(message) {
        const commandName = this.getCommandName(message)
        this.sendErrMessage(message.channel, `${message.client.queueMap[message.guild.me.voice.connection.channel.id]['playing']['songName']} is already looping, ${message.author.tag}`)
    }


}

export function QUANTATIVE_RANGE_ERR_METACLASS(argName, i, lowerBound, upperBound) {
    // first parameter: index of argument
    // second parameter: lower bound of argument
    // third parameter: upper bound of argument
    
    class QUANTATIVE_RANGE_ERR extends ErrorClass{
        
        checkPresence(message) {
            const args = this.splitArgs(message)
            const argToCheck = Number(args[i])

            // if the number isn't a whole number
            if (argToCheck % 1 != 0) return true 
            // if it is in range
            if (argToCheck >= lowerBound && argToCheck <= upperBound) return false
            // if it's not in range
            else return true

            
        }
    
        standardHandle(message) {
            const commandName = this.getCommandName(message)
            this.sendErrMessage(message.channel, `${argName} must an be an integer inbetween ${lowerBound} and ${upperBound} to use the ${commandName} command, ${message.author.tag}.`)
        }
    
    
    }

    return QUANTATIVE_RANGE_ERR
}

export class CLIENT_ALREADY_IN_VC_ERR extends ErrorClass {
    checkPresence(message: Message): boolean {
        if (message.guild.me.voice.channel != null) return true
        else return false
    }
    standardHandle(message: Message): void {
        this.sendErrMessage(message.channel, `I am already in a voice channel, ${message.author.tag}.`)
    }
}



export class MEMBER_IN_DIFFERENT_VC_THAN_CLIENT_ERR extends ErrorClass {
    checkPresence(message: Message): boolean {
        if (message.guild.me.voice.channel != message.member.voice.channel) return true
        else return false
    }

    standardHandle(message: Message): void {
        const commandName = this.getCommandName(message)
        this.sendErrMessage(message.channel,`You must be in the same voice channel as me to use the ${commandName} command, ${message.author.tag}.`)
    }
}


export class MEMBER_ALREADY_MUTED_ERR extends ErrorClass {
    checkPresence(message: Message): boolean {
        const MUTED_ROLE = message.guild.roles.cache.get('825865649233461248')
        const args = message.content.split(' ')
        const playerId = args[1].substring(3).replace('>', '')
        const playerMember = message.guild.members.cache.get(playerId)

        if (playerMember.roles.cache.find(role => role == MUTED_ROLE)) return true
        else return false
        
    }

    standardHandle(message: Message): void {
        const args = message.content.split(' ')
        this.sendErrMessage(message.channel, `${args[1]} is already muted, ${message.author.tag}.`)
    }
}

export class MEMBER_ALREADY_UNMUTED_ERR extends ErrorClass {
    checkPresence(message: Message): boolean {
        const MUTED_ROLE = message.guild.roles.cache.get('825865649233461248')
        const args = message.content.split(' ')
        const playerId = args[1].substring(3).replace('>', '')
        const playerMember = message.guild.members.cache.get(playerId)

        let muted = false

        if (playerMember.roles.cache.find(role => role == MUTED_ROLE)) muted = true

        if (!muted) return false
        else return true
        
    }

    standardHandle(message: Message): void {
        const args = message.content.split(' ')
        this.sendErrMessage(message.channel, `${args[1]} is not muted, ${message.author.tag}.`)
    }
}

export type ERROR = Function
export type ERROR_METACLASS = Function
