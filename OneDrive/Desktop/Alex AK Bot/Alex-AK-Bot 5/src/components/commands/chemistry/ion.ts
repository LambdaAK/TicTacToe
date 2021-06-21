import { Message, MessageEmbed } from "discord.js";
import HydroCarbon from "../../..";
import CommandClass from "../../classes/CommandClass";
import { ErrorClass } from "../../classes/ErrorClass";
import pt from "./pt";


@ion.errorCheck([
    ion.MISSING_ARGS_ERR_METACLASS(2),
    ion.ION_NOT_FOUND_ERR

])

export default class ion extends CommandClass {


    private static createIonObject(name: string, formula: string, charge: number) {
        return {name: name, formula: formula, charge: charge}
    }

    private static ions: Array<object> = [
        ion.createIonObject('acetate', 'C2 H3 O2', -1),
        ion.createIonObject('arsenate', 'As O4', -3),
        ion.createIonObject('arsenite', 'As O3', -3),
        ion.createIonObject('benzoate', 'C6 H5 C O O', -1),
        ion.createIonObject('borate', 'B O3', -3),
        ion.createIonObject('borate', 'B O3', -3),
        ion.createIonObject('bromate', 'Br O3', -1),
        ion.createIonObject('carbonate', 'C O3', -2),
        ion.createIonObject('chlorate', 'Cl O3', -1)

    ]

    public async commandMain(message: Message, Client: HydroCarbon) {
        const arg = message.content.toLowerCase().split(' ')[1]
            ion.ions.forEach((ionInfo => {
                if (arg == ionInfo['name'] || arg == ionInfo['formula']) {
                    const embed = new MessageEmbed()
                    embed.setTitle(`Information for ${ionInfo['name']}`)
                    embed.addField(`Formula`, ionInfo['formula'], true)
                    embed.addField('Charge', ionInfo['charge'], true)
                    message.channel.send(embed)
                }
            }))
    }

    static ION_NOT_FOUND_ERR = class ION_NOT_FOUND_ERR extends ErrorClass {

        checkPresence(message: Message): boolean {
            const arg = message.content.toLowerCase().split(' ')[1]
            let present: boolean = true
            ion.ions.forEach((ionInfo => {
                if (arg == ionInfo['name'] || arg == ionInfo['formula']) {
                    present = false
                }
            }))
            return present

   
        }
    
        standardHandle(message: Message): void {
            pt.sendErrMessage(message.channel, `You must provide a valid polyatonic ion name or symbol to use the pt command, ${message.author.tag}.`)
        }

    }
}