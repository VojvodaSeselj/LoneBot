const Discord = require("discord.js");
const mongoose = require("mongoose");
const RemoveRole = require("../../models/removerole.js");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .removerole <User> <Role>`);
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.channel.send("User not found!");
    let wrole = args.slice(1).join(" ")
    if (!wrole) return message.reply("Specify a role!");
    let rRole = message.guild.roles.find((r) => r.name === wrole);
    if (!rRole) return message.reply("Couldn't find that role");
    if (!rUser.roles.has(rRole.id)) return message.reply(`${rUser} don't have ${rRole}`)

    let roleembed = new Discord.RichEmbed()
        .setAuthor(rUser.user.tag, rUser.user.avatarURL)
        .setColor("#ff0000")
        .addField("Role Removed By", `${message.author}`)
        .addField("Role Removed", wrole);

    let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
    if (!logschannel) return message.reply("Couldn't find reports channel.");
    logschannel.send(roleembed);

    if (rUser.roles.has(rRole.id))
    await(rUser.removeRole(rRole.id));

    const removerole = new RemoveRole({
        Guild: message.guild.id,
        RoleRemovedUser: {
          Username: rUser.user.username,
          ID: rUser.user.id,
        },
        RoleRemovedBy: {
          Username: message.author.username,
          ID: message.author.id,
        },
        RoleRemoved: wrole,
        Time: message.createdAt

    });

    removerole.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
}

module.exports.help = {
    name: "removerole"
}
