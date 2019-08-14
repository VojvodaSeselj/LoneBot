const Discord = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const Ban = require("../../models/ban.js");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .ban <User> <Reason>`);
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send("User not found!");
    let bReason = args.slice(1).join(" ");
    if (!bReason) return message.channel.send("You need to supply a reason!");
    if (bUser.roles.some(r=>["Lonewolf", "⚒ Moderator ⚒"].includes(r.name))) return message.reply("You can't ban this user!");

    let banembed = new Discord.RichEmbed()
        .setAuthor(bUser.user.tag, bUser.user.avatarURL)
        .setColor("#ff0000")
        .addField("Banned User ID", `**${bUser.user.id}**`)
        .addField("Banned By", `<@${message.author.id}> with ID **${message.author.id}**`)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason)

    let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
    if (!logschannel) return message.reply("Couldn't find logs channel.");

    message.guild.member(bUser).ban(bReason)
    message.delete().catch(O_o => {});
    logschannel.send(banembed);

    const ban = new Ban({
        Guild: message.guild.id,
        BannedUser: {
          Username: bUser.user.username,
          ID: bUser.user.id,
        },
        BannedBy: {
          Username: message.author.username,
          ID: message.author.id,
        },
        Reason: bReason,
        Time: message.createdAt

    });

    ban.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
}

module.exports.help = {
    name: "ban"
}
