const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const Warn = require("../../models/warn.js");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You don't have required permissions!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .warnlevel <User>`);
    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!wUser) return message.channel.send("User not found!");
    let guild = message.guild.id;
    let warnings = await Warn.find({
      Guild: guild,
      WarnedUser: {
        Username: wUser.user.username,
        ID: wUser.user.id,
      },
    })

    message.reply(`<@${wUser.id}> has ${warnings.length} warnings.`)
}

module.exports.help = {
    name: "warnlevel"
}
