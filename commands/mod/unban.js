const Discord = require("discord.js");
const mongoose = require("mongoose");
const UnBan = require("../../models/unban.js");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .unban <User ID>`);
    let bUser = args[0];
    if (!bUser) return message.reply("You must suppy ID of User you want to unbna!");
    if (isNaN(bUser)) return message.reply("You must supply ID of User you want to unban!");

    let unbanembed = new Discord.RichEmbed()
        .setDescription("UnBan")
        .setColor("#ff0000")
        .addField("UnBanned User ID", `**${bUser}**`)
        .addField("UnBanned By", `<@${message.author.id}> with ID **${message.author.id}**`)
        .addField("Time", message.createdAt)

    let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
    if (!logschannel) return message.reply("Couldn't find logs channel.");

    message.guild.unban(bUser);
    message.delete().catch(O_o => {});
    logschannel.send(unbanembed);

    const unban = new UnBan({
        Guild: message.guild.id,
        UnbannedUser: {
          ID: bUser.user.id,
        },
        UnbannedBy: {
          Username: message.author.username,
          ID: message.author.id,
        },
        Time: message.createdAt

    });

    unban.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
}

module.exports.help = {
    name: "unban"
}
