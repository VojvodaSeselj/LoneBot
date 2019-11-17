const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const User = require("../../models/user.js");

module.exports = {
    name: "level",
    aliases: [],
    category: "Member",
    description: "Shows your level and XP progress.",
    usage: "Level",
    cooldown: 5,
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let user = await User.findOne({
      Guild: guildid,
      ID: message.author.id
    });
    if (!user) {
      user = new User({
        Guild: guildid,
        ID: message.author.id,
        XP: 0,
        Level: 1,
        Cash: 0,
        Bank: 1000,
        Joined: message.author.joinedAt
      });
    }
    let currentXp = user.XP;
    let currentLevel = user.Level;
    let untilNext = 5 * ((user.Level + 1) ** 2) + 50 * (user.Level + 1) + 100
    let lvlEmbed = new RichEmbed()
        .setColor("#00c3df")
        .setThumbnail(message.guild.iconURL)
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setDescription(stripIndents`**Level Information**
          **Level ${currentLevel} | 1000**
          **XP ${currentXp}**
          **You need ${untilNext - currentXp} to reach next level!**
          **Reminder: You will not gain XP while being chat muted!**`)
    message.channel.send(lvlEmbed);

    user.save().catch(err => console.log(err));
  }
}
