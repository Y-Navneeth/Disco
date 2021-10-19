console.clear()

const Discord = require('discord.js');
const Distube = require('distube');
const config = require('./config.json');
const fs = require('fs');
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const RadioBrowser = require('radio-browser') //-- Optional Comming Soon!

const client = new Discord.Client({
	intents: [
		'GUILDS',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGES',
	],
})

//------------------------------------------------------
client.on('ready', () => {
  client.user.setActivity(`${config.prefix}help`,{ type: "LISTENING" })
  console.log(`Logged in as ${client.user.tag}`)
})

client.on('guildCreate', (guild) => {
  const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT')
  const em = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setAuthor("Thanks For Adding me! Use " + `d!help`, "https://i.pinimg.com/474x/1d/3a/26/1d3a2651f9ad02fb12aae08f618a2847.jpg")
  .addFields(
    { name: `<a:musicbeat:899644866051579966>` +" A Music Bot Aims to provide high-quality music!", value: "Use " +'`d!helpmusic `' + "To get list of music commands", inline: false },

    { name: `🛠`+ " Moderation commands", value: "Use `d!helpmod` to get the list of Moderation commands!" },
  )
  channel.send({ embeds: [em] })
})

//-------------------------------------------------------
client.distube = new Distube.default(client, {
  emitNewSongOnly: true,
  leaveOnFinish: false,
  leaveOnEmpty: false,
  leaveOnStop: true,
  plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
  updateYouTubeDL: true,
  searchSongs: 6,
  searchCooldown: 10
})

//-----------------------------------------------------------------
client.commands = new Discord.Collection()

//--------------------------------------------------------------------------

const commandFolders = fs.readdirSync(`./commands`)

for(const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for(const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

//---------------------------------------------------------------------------

client.on('messageCreate', async(message) => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  if(message.content.startsWith(config.prefix)) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);

    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if(!command) return

    command.run(client, message, args)
  }
})
//----------------------------------------------------------------------------
//Distube events
client.distube
.on('addSong', (queue, song) => {
  const em = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setTitle('Added Song!')
  .setDescription(`Song is in the queue ${song.name}`)
  queue.textChannel.send({ embeds: [em] })
})
.on('playSong', (queue, song) => {
  try {
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle('Now Playing 🎶')
      .setThumbnail(`${song.thumbnail}`)
      .setDescription(`[${song.name}](${song.url})`)
      .setFooter(`Disco The best music bot`)

    queue.textChannel.send({ embeds: [embed]})
  } catch (e) {}
})
.on('searchResult', (message, result) => {
  let i = 0
  const em = new Discord.MessageEmbed()
                  .setColor("BLUE")
                  .setTitle("**Select a song from 1-6 to play🎧**")
                  .setDescription(`\n${result
                    .map(
                      song =>
                        `**${++i}**. ${song.name} - \`${
                          song.formattedDuration
                        }\``,
                    )
                    .join(
                      '\n',
                    )}\n*Enter anything else or wait 30 seconds to cancel*`,``)
  message.channel.send({ embeds: [em] });
})
.on('searchCancel', message => message.channel.send(`❌ | **Searching canceled**`))
	.on('searchInvalidAnswer', message =>
		message.channel.send(`searchInvalidAnswer`))
	.on('searchNoResult', message => message.channel.send(`No result found!`))
  
  .on('searchDone', (message, answer, query) => {})
//------------------------------------------------------------------------




//------------------------------------------------------------------------

client.login(config.token)
