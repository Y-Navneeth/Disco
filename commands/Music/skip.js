module.exports = {
    name: "skip",
    aliases: ['skip', 'jump'],
    run: async(client, message, args) => {
        const queue = client.distube.getQueue(message)
        const channel = message.member.voice.channel
        if(!queue) return message.channel.send("**There is no song playing right now! **")

        if (!channel) return message.reply("**Join a voice channel to use this command**")
        if (queue.songs.length === 1 || queue.songs.length === 0) return message.channel.send("**There is no song to skip**")

        else{
            try{
                client.distube.skip(message)
            }catch (e) {
                message.channel.send(`\`\`\`${e}\`\`\``)
            }
        }
    }
}