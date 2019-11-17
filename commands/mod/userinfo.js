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
    cooldown: 5,
    run: async (bot, message, args) => {
        let guild = await Guild.findOne({
          Guild: message.guild.id
        });
        if (message.deletable) message.delete()

        if (!message.member.roles.some(r=>guild.ModeratorRole.concat(guild.AdminRole).includes(r.name)) && !message.member.hasPermission("ADMINISTRATOR")) {
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
          WarnedUser: { ID: userInfo.user.id },
        })

        let roles = userInfo.roles.map(role => role.toString());
        let user = await User.findOne({
          Guild: message.guild.id,
          ID: userInfo.user.id
        });
        let embed = new RichEmbed()
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
        return message.channel.send(embed);
  }
}
