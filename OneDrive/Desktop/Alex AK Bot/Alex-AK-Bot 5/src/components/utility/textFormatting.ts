export {}
class textFormatting {
    // text formatting for discord
    italicize(s: string) {
        return `*${s}*`
    }
    bold(s: string) {
        return `**${s}**`
    }
    boldItalicized(s: string) {
        return `***${s}***`
    }
    underline(s: string) {
        return `__${s}__`
    }
    crossedOut(s: string){
        return `~~${s}~~`
    }
    singleLineBlock(s: string) {
        return `\`${s}\``
    }
    multiLineBlock(s: string) {
        return `\`\`\`${s}\`\`\``
    }
    red(s: string) {
        return `\`\`\`diff\n-${s}\`\`\``
    }
    orange(s: string) {
        return `\`\`\`css\n[${s}]\n\`\`\``
    }
    yellow(s: string) {
        return `\`\`\`fix\n${s}\`\`\``
    }
    green(s: string) {
        return `\`\`\`diff\n+${s}\`\`\``
    }
    lightGreen(s: string) {
        return `\`\`\`css\n${s}\`\`\``
    }
    darkGreen(s: string) {
        return `\`\`\`bash\n${s}\`\`\``
    }
    blue(s: string) {
        return `\`\`\`ini\n[${s}]\`\`\``
    }
}
module.exports = new textFormatting()