const Discord = require("discord.js");
const search = require('random-puppy')
const Guild = require("../../models/guild.js");

module.exports = {
    name: "anal",
    aliases: [],
    category: "NSFW",
    description: "Shows random anal picture/gif.",
    usage: "Anal",
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let defaultprefix = "."
    let guild = await Guild.findOne({
      Guild: guildid
    });
    if (guild.Nsfw = "false") return;
    if (guild.Nsfw = "true") {
    if (!message.channel.nsfw) return message.channel.send(":underage: You need to be in an NSFW channel to use this command.");
    let key = [
      "anal",
      "assfuck",
      "asshole"
    ]

    let res = key[Math.floor(Math.random()*key.length)]
    let analEmbed = new Discord.RichEmbed()
    .setTitle("Anal")
    .setDescription("Hope you like it :wink:")
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp()

    search(res).then(url => {
      analEmbed.setImage(url)
      message.channel.send({embed: analEmbed})
      })
    }
  }
}
