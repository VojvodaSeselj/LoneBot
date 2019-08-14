const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .setnick <User> <Nickname>`);
    let nUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!nUser) return message.channel.send("User not found!");
    let nNick = args.slice(1).join(" ");
    if (!nNick) return message.channel.send("You need to supply a new nickname!");

    message.guild.members.get(nUser.id).setNickname(`${nNick}`);
    message.channel.send(`<@${nUser.id}> your nickname has been changed to ${nNick}!`);
}

module.exports.help = {
    name: "setnick"
}
