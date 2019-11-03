const Discord = require("discord.js");
const RemoveRole = require("../../models/removerole.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "removerole",
    aliases: [],
    category: "Owner",
    description: "Remove role from member.",
    usage: "RemoveRole <User> <Role-Name>",
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let guild = await Guild.findOne({
      Guild: guildid
    });
    if (!message.member.roles.some(r=>["Lonewolf", "God"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: ${guild.Prefix}${module.exports.usage}`);
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.channel.send("User not found!");
    let wrole = args.slice(1).join(" ")
    if (!wrole) return message.reply("Specify a role!");
    let rRole = message.guild.roles.find((r) => r.name === wrole);
    if (!rRole) return message.reply("Couldn't find that role");
    if (!rUser.roles.has(rRole.id)) return message.reply(`${rUser} don't have ${rRole}`)

    let roleembed = new Discord.RichEmbed()
        .setAuthor(rUser.user.tag, rUser.user.avatarURL)
        .setColor("#00c3df")
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
}
