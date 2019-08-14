const Discord = require("discord.js");
const mongoose = require("mongoose");
const fs = require("fs");
const Kick = require("../../models/kick.js");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .kick <User> <Reason>`);
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.channel.send("User not found!");
    let kReason = args.slice(1).join(' ');
    if (!kReason) return message.channel.send("You need to supply a reason!");
    if (kUser.roles.some(r=>["Lonewolf", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("You can't kick this user!");

    let kickembed = new Discord.RichEmbed()
        .setAuthor(kUser.user.tag, kUser.user.avatarURL)
        .setColor("#ff8c00")
        .addField("Kicked User ID", `**${kUser.user.id}**`)
        .addField("Kicked By", `<@${message.author.id}> with ID **${message.author.id}**`)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason)

    let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
    if (!logschannel) return message.reply("Couldn't find logs channel.");

    message.guild.member(kUser).kick(kReason)
    message.delete().catch(O_o => {});
    logschannel.send(kickembed);

    const kick = new Kick({
        Guild: message.guild.id,
        KickedUser: {
          Username: kUser.user.username,
          ID: kUser.user.id,
        },
        KickedBy: {
          Username: message.author.username,
          ID: message.author.id,
        },
        Reason: kReason,
        Time: message.createdAt

    });

    kick.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));

}

module.exports.help = {
    name: "kick"
}
