const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember } = require("../../functions.js");
const Warn = require("../../models/warn.js");
const User = require("../../models/user.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "userinfo",
    aliases: [],
    category: "Moderation",
    description: "Shows user's informations.",
    usage: "UserInfo <User>",
    run: async (bot, message, args) => {
        if (message.deletable) message.delete()

        if (!message.member.roles.some(r=>guild.ModeratorRoles.concat(guild.AdminRoles).includes(r.id)) || message.member.hasPermission("ADMINISTRATOR")) {
          return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
        }
        if (!args[0]) {
          return message.reply("You need to provide a member to see their informations!").then(m => m.delete(5000));
        }
        const userInfo = await getMember(message, args[0]);
        if (!userInfo) {
          return message.reply("Couldn't find that member!").then(m => m.delete(5000));
        }
        let warnings = await Warn.find({
          Guild: message.guild.id,
          WarnedUser: {
            Username: userInfo.user.username,
            ID: userInfo.user.id,
          },
        })
        let roles = userInfo.roles.map(role => role.toString());
        let user = await User.findOne({
          Guild: message.guild.id,
          ID: userInfo.user.id
        });
        if (!user) {
          user = new User({
            Guild: message.guild.id,
            Username: userInfo.user.username,
            ID: userInfo.user.id,
            XP: 0,
            Level: 1,
            Coins: 1000,
            Joined: userInfo.joinedAt
          });
        }
        user.save().catch(err => console.log(err));
        let userinfoembed = new RichEmbed()
            .setColor("#00c3df")
            .setThumbnail(userInfo.user.displayAvatarURL)
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setDescription(stripIndents`**User's informations**
            **Username** ${userInfo.user.username}
            **Tag** ${userInfo.user.discriminator}
            **ID** ${userInfo.user.id}
            **Joined** ${userInfo.joinedAt.toDateString()}
            **Number Of Warnings** ${warnings.length}
            **Level** ${user.Level}
            **XP** ${user.XP}
            **Roles**
            ${roles.join(" **|** ")}`)
        return message.channel.send(userinfoembed);
  }
}
