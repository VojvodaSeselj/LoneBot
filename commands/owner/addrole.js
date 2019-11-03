const Discord = require("discord.js");
const AddRole = require("../../models/addrole.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "addrole",
    aliases: [],
    category: "Owner",
    description: "Add role to member.",
    usage: "AddRole <User> <Role-Name>",
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let guild = await Guild.findOne({
      Guild: guildid
    });
    if (!message.member.roles.some(r=>["Lonewolf", "God", "@everyone", "everyone", ""].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: ${guild.Prefix}${module.exports.usage}`);
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.channel.send("User not found!");
    let wrole = args.slice(1).join(" ")
    if (!wrole) return message.reply("Specify a role!");
    let rRole = message.guild.roles.find((r) => r.name === wrole);
    if (!rRole) return message.reply("Couldn't find that role");
    if (rUser.roles.has(rRole.id)) return message.reply(`${rUser} already have ${rRole}`)

    let roleembed = new Discord.RichEmbed()
        .setAuthor(rUser.user.tag, rUser.user.avatarURL)
        .setColor("#00c3df")
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
}
