const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .undeafen <User>`);
    let dUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!dUser) return message.channel.send("User not found!");
    if (dUser.roles.some(r=>["Lonewolf", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("You can't undeafen this user!");

    let undeafenembed = new Discord.RichEmbed()
        .setAuthor(dUser.user.tag, dUser.user.avatarURL)
        .setColor("#ff8c00")
        .addField("Undeafened User ID", `**${dUser.user.id}**`)
        .addField("Undeafened By", `<@${message.author.id}> with ID **${message.author.id}**`)
        .addField("Time", message.createdAt)

    let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
    if (!logschannel) return message.reply("Couldn't find logs channel.");

    dUser.setDeaf(false);
    message.channel.send(`<@${dUser.id}> you have been undeafened!`);
    message.delete().catch(O_o => {});
    logschannel.send(undeafenembed);

}

module.exports.help = {
    name: "undeafen"
}
