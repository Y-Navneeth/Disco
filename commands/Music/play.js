const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "play",
    aliases: ['p'],
    autoplay: false,
    run: async(client, message, args) => {
        const channel = message.member.voice.channel
        if(!channel) return message.reply("**Join a VC first!!**")
        const Text = args.join(" ")
        if (!args[0]) return message.reply("**No search item?**")
        const em = new MessageEmbed()
        .setColor("AQUA")
        .setTitle("Searching...")
        .setDescription(`\`\`\`${Text}\`\`\``)

        message.channel.send({ embeds: [em] })
        client.distube.play(message, Text)
    }
}
