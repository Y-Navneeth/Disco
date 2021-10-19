module.exports = {
    name: "leave",
    aliases: ['l', 'disconnect', 'dc','bye'],
    run: async(client, message, args) => {
        const channel = message.member.voice.channel
        if (!channel) return message.channel.send("**Join a Voice Channel | ❗**")
        try{
            client.distube.voices.leave(channel)
        }catch (e) {
            message.channel.send(`${e}`)
        }
        
    }
}