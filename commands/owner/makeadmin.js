const Guild = require("../../models/guild.js");

module.exports = {
    name: "makeadmin",
    aliases: [],
    category: "Owner",
    description: "Make member a server administrator.",
    usage: "MakeAdmin <User>",
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
        return message.reply("You need to provide a member you want to give admin role to!").then(m => m.delete(5000));
      }
      let role = args.slice(1).join(" ")

      const roleTo = await getMember(message, args[0]);
      if (!roleTo) {
        return message.reply("Couldn't find that member!").then(m => m.delete(5000));
      }
      const role = message.guild.roles.find((r) => r.name === guild.AdminRole);
      if (!role) {
        return message.reply("Couldn't find that role!");
      }
      if (roleTo.roles.has(role.id)) {
        return message.reply(`${roleTo} already have admin role!`)
      }
      roleTo.addRole(role.id);
  }
}
