const Discord = require("discord.js");
const search = require('random-puppy')
const Guild = require("../../models/guild.js");

module.exports = {
    name: "boobs",
    aliases: [],
    category: "NSFW",
    description: "Shows random boobs picture/gif.",
    usage: "Boobs",
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let defaultprefix = "."
    let guild = await Guild.findOne({
      Guild: guildid
    });
    if (guild.Nsfw === "true") {
    if (!message.channel.nsfw) return message.channel.send(":underage: You need to be in an NSFW channel to use this command.");
    let key = [
      "boobs",
      "tits",
      "breasts",
      "bust"
    ]

    let res = key[Math.floor(Math.random()*key.length)]
    let boobsEmbed = new Discord.RichEmbed()
    .setTitle("Boobs")
    .setDescription("Hope you like it :wink:")
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp()

    search(res).then(url => {
      boobsEmbed.setImage(url)
      message.channel.send({embed: boobsEmbed})
    })
  } else if (guild.Nsfw === "false") return;
  }
}
