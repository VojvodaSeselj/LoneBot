const { RichEmbed } = require("discord.js");
const { promptMessage, getMember } = require("../../functions.js");
const { stripIndents } = require("common-tags");
const Guild = require("../../models/guild.js");
const boje = ["light pink", "pink", "dark pink", "light orange", "orange", "dark orange", "light yellow", "yellow", "dark yellow", "light green", "green", "dark green", "light blue", "blue", "dark blue", "light purple", "purple", "dark purple", "light red", "red", "dark red"]

module.exports = {
    name: "color",
    aliases: [],
    category: "Fun",
    description: "Get a color.",
    usage: "Color <Color>",
    example: "Color light yellw",
    cooldown: 5,
    run: async (bot, message, args) => {
      let guild = await Guild.findOne({
        Guild: message.guild.id
      });
    if (!args[0]) {
      return message.reply("You need to supply color your want!").then(m => m.delete(5000));
    }
    let color = args.slice(0).join(" ")
    if(!boje.includes(args[0])) return message.reply("You can only choose from colors above!");

    const role = message.guild.roles.find((r) => r.name === color);
    if (!role) {
      return message.reply("You can only choose from colors above!");
    }
    if (message.author.roles.some(boje)) {
      return message.reply(`${rUser} you already got this color!`)
    }

  }
}
