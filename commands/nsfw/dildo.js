const Discord = require("discord.js");
const search = require('random-puppy')
const Guild = require("../../models/guild.js");

module.exports = {
    name: "dildo",
    aliases: [],
    category: "NSFW",
    description: "Shows random dildo picture/gif.",
    usage: "Dildo",
    cooldown: 5,
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let defaultprefix = "."
    let guild = await Guild.findOne({
      Guild: guildid
    });
    if (guild.Nsfw === "true") {
    if (!message.channel.nsfw) return message.channel.send(":underage: You need to be in an NSFW channel to use this command.");
    let key = [
      'dildo',
      'fuckmachine',
      'analdildo',
      'pussydildo',
      'machinedildo'
    ]

    let res = key[Math.floor(Math.random()*key.length)]
    let dildoEmbed = new Discord.RichEmbed()
    .setTitle("Dildo")
    .setDescription("Hope you like it :wink:")
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp()

    search(res).then(url => {
      dildoEmbed.setImage(url)
      message.channel.send({embed: dildoEmbed})
    })
  } else if (guild.Nsfw === "false") return;
}
}
