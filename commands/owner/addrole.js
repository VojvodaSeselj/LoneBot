const Discord = require("discord.js");
const mongoose = require("mongoose");
const AddRole = require("../../models/addrole.js");

module.exports.run = async(bot, message, args) => {

    if (!message.member.roles.some(r=>["Lonewolf", "God"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .addrole <User> <Role>`);
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.channel.send("User not found!");
    let wrole = args.slice(1).join(" ")
    if (!wrole) return message.reply("Specify a role!");
    let rRole = message.guild.roles.find((r) => r.name === wrole);
    if (!rRole) return message.reply("Couldn't find that role");
    if (rUser.roles.has(rRole.id)) return message.reply(`${rUser} already have ${rRole}`)

    let roleembed = new Discord.RichEmbed()
        .setAuthor(rUser.user.tag, rUser.user.avatarURL)
        .setColor("#0785ed")
        .addField("Role Given By", `${message.author}`)
        .addField("Role Given", wrole);

    let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
    if (!logschannel) return message.reply("Couldn't find reports channel.");
    logschannel.send(roleembed);

    if (!rUser.roles.has(rRole.id))
    await(rUser.addRole(rRole.id));

    const addrole = new AddRole({
        Guild: message.guild.id,
        RoleGivenUser: {
          Username: rUser.user.username,
          ID: rUser.user.id,
        },
        RoleGivenBy: {
          Username: message.author.username,
          ID: message.author.id,
        },
        RoleGiven: wrole,
        Time: message.createdAt

    });

    addrole.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
}

module.exports.help = {
    name: "addrole"
}
