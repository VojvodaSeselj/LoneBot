const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const Warn = require("../../models/warn.js");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .userinfo <User>`);
    let iUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!iUser) return message.reply("User not found!"); {
        let uicon = iUser.user.displayAvatarURL;
        let guild = message.guild.id;
        let warnings = await Warn.find({
          Guild: guild,
          WarnedUser: {
            Username: iUser.user.username,
            ID: iUser.user.id,
          },
        })
        let roles = iUser.roles.map(role => role.toString());
        let userinfoembed = new Discord.RichEmbed()
            .setAuthor(iUser.user.tag, iUser.user.avatarURL)
            .setThumbnail(uicon)
            .setColor("#1ec8ce")
            .addField("Username", iUser.user.username, true)
            .addField("ID", iUser.id, true)
            .addField("Joined Server", iUser.joinedAt.toDateString(), true)
            .addField("Number of Warnings", `${warnings.length}`, true)
            .addField("Roles", roles.join(" **|** "), true);

        return message.channel.send(userinfoembed);
    }
};

module.exports.help = {
    name: "userinfo"
}
