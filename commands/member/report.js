const Discord = require("discord.js");
const mongoose = require("mongoose");
const Report = require("../../models/report.js");

module.exports.run = async(bot, message, args) => {
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .report <User> <Reason>`);
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.reply("User not found!");
    let rReason = args.slice(1).join(" ");
    if (!rReason) return message.channel.send("You need to supply a reason!");

    let reportembed = new Discord.RichEmbed()
        .setAuthor(rUser.user.tag, rUser.user.avatarURL)
        .setColor("#78bab0")
        .addField("Reported By", `${message.author}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", `${rReason}`)

    let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
    if (!logschannel) return message.reply("Couldn't find reports channel.");

    message.delete().catch(O_o => {});
    logschannel.send(reportembed);

    const report = new Report({
        Guild: message.guild.id,
        ReportedUser: {
          Username: rUser.user.username,
          ID: rUser.user.id,
        },
        ReportedBy: {
          Username: message.author.username,
          ID: message.author.id,
        },
        Reason: rReason,
        Time: message.createdAt

    });

    report.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));

}

module.exports.help = {
    name: "report"
}
