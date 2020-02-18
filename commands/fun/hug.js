const { RichEmbed } = require("discord.js");
const { promptMessage, getMember } = require("../../functions.js");
const { stripIndents } = require("common-tags");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "hug",
    aliases: [],
    category: "Fun",
    description: "Hug your friends.",
    usage: "Hug <Member>",
    example: "Hug @Username#9287",
    cooldown: 5,
    run: async (bot, message, args) => {
      let guild = await Guild.findOne({
        Guild: message.guild.id
      });
    if (!args[0]) {
      return message.reply("You need to supply member's name!").then(m => m.delete(5000));
    }
    let hugged = getMember(message, args[0]);
    if (!hugged) {
      return message.reply("That member is not on our server!").then(m => m.delete(5000));
    }
    message.channel.send(`${hugged}, ${message.author} hugged you! :hugging:`);
  }
}
