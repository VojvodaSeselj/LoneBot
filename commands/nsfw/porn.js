const Discord = require("discord.js");
const search = require('random-puppy')
const Guild = require("../../models/guild.js");

module.exports = {
    name: "porn",
    aliases: [],
    category: "NSFW",
    description: "Shows random porn gif.",
    usage: "Porn",
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let defaultprefix = "."
    let guild = await Guild.findOne({
      Guild: guildid
    });
    if (guild.Nsfw === "true") {
    if (!message.channel.nsfw) return message.channel.send(":underage: You need to be in an NSFW channel to use this command.");
    let key = [
      "titfuck",
      "orgy",
      "orgasm",
      "fuck",
      "pussyfuck",
      "assfuck",
      "penetration",
      "penetrate",
      "sex",
      "sexy"
    ]

    let res = key[Math.floor(Math.random()*key.length)]
    let pornEmbed = new Discord.RichEmbed()
    .setTitle("Porn")
    .setDescription("Hope you like it :wink:")
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp()

    search(res).then(url => {
      pornEmbed.setImage(url)
      message.channel.send({embed: pornEmbed})
    })
  } else if (guild.Nsfw === "false") return;
}
}
