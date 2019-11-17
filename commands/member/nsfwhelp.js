const { RichEmbed } = require("discord.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "nsfwhelp",
    aliases: [],
    category: "Member",
    description: "Shows help for NSFW commands.",
    usage: "NSFWHelp",
    cooldown: 5,
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let defaultprefix = "."
    let guild = await Guild.findOne({
      Guild: guildid
    });
    if (guild.Nsfw === "true") {
      let nsfwhelpembed = new RichEmbed()
      .setDescription("NSFW Help")
      .setColor("#00c3df")
      .addField(`**${guild.Prefix}ass**`, `Send random ass image.`)
      .addField(`**${guild.Prefix}pussy**`, `Send random pussy image.`)
      .addField(`**${guild.Prefix}feet**`, `Send random feet image/gif.`)
      .addField(`**${guild.Prefix}dildo**`, `Send random dildo image/gif.`)
      .addField(`**${guild.Prefix}porn**`, `Send random porn image/gif.`)
      .addField(`**${guild.Prefix}boobs**`, `Send random boobs image.`)
      .addField(`**${guild.Prefix}anal**`, `Send random anal image/gif.`)
      .addField(`**${guild.Prefix}thighs**`, `Send random socks image.`);
      message.channel.send(nsfwhelpembed);
    } else if (guild.Nsfw === "false") return;
  }
}
