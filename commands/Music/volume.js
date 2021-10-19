const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "volume",
    aliases: ['vol', 'v'],
    run: async(client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send("Nothing is playing right now")
        try{
        client.distube.setVolume(message, Number(args[0]));
        const em = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Volume 🔊")
        .setDescription(`**Volume:** \`${queue.volume}\``)
        .setFooter("Disco the best music bot!", "https://i.pinimg.com/474x/1d/3a/26/1d3a2651f9ad02fb12aae08f618a2847.jpg")
        message.channel.send({ embeds: [em] })
    }catch (e) {
        message.channel.send(`\`\`\`${e}\`\`\` **Use correct syntax to prevent this!!**`)
    }
}
};
    