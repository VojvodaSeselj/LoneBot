const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js")
const AddRole = require("../../models/addrole.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "addrole",
    aliases: [],
    category: "Owner",
    description: "Adds a role to member.",
    usage: "AddRole <User> <Role-Name>",
    cooldown: 5,
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let guild = await Guild.findOne({
      Guild: guildid
    });
    if (message.deletable) message.delete()

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
    }
    if (!args[0]) {
      return message.reply("You need to provide a member you want to give role to!").then(m => m.delete(5000));
    }
    if (!args[1]) {
      return message.reply("You need to provide role name that you want to give to this member!").then(m => m.delete(5000));
    }
    const wrole = args.slice(1).join(" ")

    const roleTo = await getMember(message, args[0]);
    if (!roleTo) {
      return message.reply("Couldn't find that member!").then(m => m.delete(5000));
    }
    const rRole = message.guild.roles.find((r) => r.name === wrole);
    if (!rRole) {
      return message.reply("Couldn't find that role!");
    }
    if (rUser.roles.has(rRole.id)) {
      return message.reply(`${rUser} already have that role!`)
    }

    let embed = new RichEmbed()
        .setAuthor(rUser.user.tag, rUser.user.avatarURL)
        .setColor("#00c3df")
        .addField("Role Given By", `${message.author}`)
        .addField("Role Given", wrole);

    const logsChannel = message.guild.channels.find(channel => channel.name === guild.LogsChannel);
    if (!logsChannel) {
      return message.reply("Couldn't find logs channel.");
    }
    logsChannel.send(embed);

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
