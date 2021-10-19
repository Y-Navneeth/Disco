const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "playing",
    aliases: ['playing'],
    run: async(client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply("**Nothing is playing right now!**")
        const song = queue.songs[0]

        try {
            const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle("Now Playing <a:musicbeat:899644866051579966>")
            .setThumbnail(`${song.thumbnail}`)
            .setDescription(`**Url:** [${song.name}](${song.url})`)
            .addFields(
                { name: "<:emoji_12:893503239939571753>", value: `${song.likes}`, inline: true },
                { name: "<:emoji_11:893503183324848179>", value: `${song.dislikes}`, inline: true },
                { name: "🔊 **Volume**", value: `\`${queue.volume}\`` , inline: true},
                { name: "Filters", value:`Filters : \`${queue.filter}\``, inline: true },
                { name: "Uploaded by", value: `[${song.uploader.name}](${song.uploader.url}) `, inline: true }
              )
            message.reply({ embeds: [embed] })
        } catch(e) {
            message.channel.send(`\`\`\`${e}\`\`\``)
        }
    }
}