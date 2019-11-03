const Discord = require("discord.js");
const search = require('random-puppy')
const Guild = require("../../models/guild.js");

module.exports = {
    name: "ass",
    aliases: [],
    category: "NSFW",
    description: "Shows random ass picture/gif.",
    usage: "Ass",
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let defaultprefix = "."
    let guild = await Guild.findOne({
      Guild: guildid
    });
    if (guild.Nsfw === "true") {
    if (!message.channel.nsfw) return message.channel.send(":underage: You need to be in an NSFW channel to use this command.");
    let key = [
      "ass",
      "butt",
      "asshole",
      "pussy",
      "butthole"
    ]

    let res = key[Math.floor(Math.random()*key.length)]
    let assEmbed = new Discord.RichEmbed()
    .setTitle("Ass")
    .setDescription("Hope you like it :wink:")
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp()

    search(res).then(url => {
      assEmbed.setImage(url)
      message.channel.send({embed: assEmbed})
    })
  } else if (guild.Nsfw === "false") return;
  }
}
