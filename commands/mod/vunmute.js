const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .vunmute <User>`);
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!mUser) return message.reply("User not found!");
    let cmuterole = message.guild.roles.find(role => role.name === "VoiceMuted");
    message.delete().catch(O_o => {});

    let cunmuteembed = new Discord.RichEmbed()
        .setAuthor(mUser.user.tag, mUser.user.avatarURL)
        .setColor("#ff9400")
        .addField("Voice UnMuted User ID", `**${mUser.user.id}**`)
        .addField("Voice UnMuted By", `<@${message.author.id}> with ID **${message.author.id}**`)
        .addField("Time", message.createdAt)

    let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
    if (!logschannel) return message.reply("Couldn't find logs channel.");
    logschannel.send(cunmuteembed);

    await(mUser.removeRole(cmuterole.id));
    message.channel.send(`<@${mUser.id}> you have been unmuted from voice`);
}
module.exports.help = {
    name: "vunmute"
}
