const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const mongoose = require("mongoose");
const Warn = require("../../models/warn.js");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .warn <User> <Reason>`);
    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!wUser) return message.channel.send("User not found!");
    let wReason = args.slice(1).join(" ");
    if (!wReason) return message.channel.send("You need to supply a reason!");

    let warnembed = new Discord.RichEmbed()
        .setAuthor(wUser.user.tag, wUser.user.avatarURL)
        .setColor("#6b0808")
        .addField("Warned User ID", `**${wUser.user.id}**`)
        .addField("Warned By", `<@${message.author.id}> with ID **${message.author.id}**`)
        .addField("Reason", wReason);

    let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
    if (!logschannel) return message.reply("Couldn't find reports channel.");

    message.delete().catch(O_o => {});
    logschannel.send(warnembed);

    const warn = new Warn({
        Guild: message.guild.id,
        WarnedUser: {
          Username: wUser.user.username,
          ID: wUser.user.id,
        },
        WarnedBy: {
          Username: message.author.username,
          ID: message.author.id,
        },
        Reason: wReason,
        Time: message.createdAt

    });

    warn.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));

        let guild = message.guild.id;
        let warnings = await Warn.find({
            Guild: guild,
            WarnedUser: {
              Username: wUser.user.username,
              ID: wUser.user.id,
            },
        })
        console.log(warnings);
        message.channel.send(`<@${wUser.id}> you have been warned for **${wReason}**,be careful because ${3 - warnings.length} more warnings will get you banned!`)

    if (warnings.length === 3) {
        message.guild.member(wUser).ban("Warned too many times");
        message.channel.send(`<@${wUser.id}> has been banned for getting warned third time!`)
    }

}

module.exports.help = {
    name: "warn"
}
