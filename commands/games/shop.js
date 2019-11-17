const { getMember } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const Shop = require("../../models/shop.js");

module.exports = {
    name: "shop",
    aliases: [],
    category: "Games",
    description: "Show roles you can buy from shop.",
    usage: "Shop",
    example: "Shop",
    cooldown: 5,
    run: async (bot, message, args) => {
      let guildid = message.guild.id;
      let shop = await Shop.findOne({ Guild: guildid })
      if (message.deletable) message.delete()


  }
}
