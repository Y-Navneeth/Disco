module.exports = {
    name: "pause",
    aliases: ['pause'],
    run: async(client, message, args) => {
        const queue = client.distube.getQueue(message)
        if(!queue) return message.reply('**There is nothing to pause!**')

        if(queue.paused) return message.reply("**The Song is already paused! | `⏸`**")

        try {
            client.distube.pause(message)
            message.channel.send('**Paused the Song!**')
        }catch(e) {
            message.channel.send(`\`\`\`${e}\`\`\``)
        }
    }
}