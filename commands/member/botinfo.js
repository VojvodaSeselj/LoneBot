const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { utc } = require("moment");

module.exports = {
    name: "botinfo",
    aliases: [],
    category: "Member",
    description: "Shows bot informations.",
    usage: "BotInfo",
    run: async (bot, message, args) => {
    const Owner = bot.users.get("345970401660239882") || await bot.fetchUser("345970401660239882");
    let embed = new RichEmbed()
        .setColor("#00c3df")
        .setThumbnail(bot.user.displayAvatarURL)
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setDescription(stripIndents`**General informations**
        **Bot Name** ${bot.user.username}
        **Bot ID** ${bot.user.id}
        **Created At** ${utc(bot.user.createdAt).format("dddd, MM Do YYYY")}
        **Owner Name** ${Owner.username}
        **Owner ID** ${Owner.id}
        **Language** JavaScript - Discord.Js

        **Statistics**
        **Api Ping** ${Math.floor(bot.ping)}ms
        **Response Time** ${Date.now() - message.createdTimestamp}ms
        **Guild Count** ${bot.guilds.size}
        **Members Count** ${bot.users.size}
        **Channel Count** ${bot.channels.filter(x => x.type !== "category").size}
        **Category Count** ${bot.channels.filter(x => x.type === "category").size}
        **Command Count** ${bot.commands.size}
        **Online Time** ${require("ms")(bot.uptime)}`)

    return message.channel.send(embed);
  }
}
