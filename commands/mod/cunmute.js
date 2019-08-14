const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .cunmute <User>`);
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!mUser) return message.reply("User not found!");
    if (mUser.roles.some(r=>["Lonewolf", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("You can't unmute this user!");
    let cmuterole = message.guild.roles.find(role => role.name === "ChatMuted");
    message.delete().catch(O_o => {});

    let cunmuteembed = new Discord.RichEmbed()
        .setAuthor(mUser.user.tag, mUser.user.avatarURL)
        .setColor("#ff9400")
        .addField("Chat UnMuted User ID", `**${mUser.user.id}**`)
        .addField("Chat UnMuted By", `<@${message.author.id}> with ID **${message.author.id}**`)
        .addField("Time", message.createdAt)

    let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
    if (!logschannel) return message.reply("Couldn't find logs channel.");
    logschannel.send(cunmuteembed);

    await(mUser.removeRole(cmuterole.id));
    message.channel.send(`<@${mUser.id}> you have been unmuted from chat`);
}
module.exports.help = {
    name: "cunmute"
}
