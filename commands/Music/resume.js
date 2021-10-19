module.exports = {
    name: "resume",
    aliases: ['resume'],
    run: async(client, message, args) => {
        const queue = client.distube.getQueue(message)
        if(!queue) return message.reply('**There is nothing to resume!**')

        if(queue.resumed) return message.reply("**The Song is already resumed! | `▶`**")

        try {
            client.distube.resume(message)
            message.channel.send('**Resumed the Song!**')
        }catch(e) {
            message.channel.send(`\`\`\`${e}\`\`\``)
        }
    }
}