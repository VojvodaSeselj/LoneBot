const Guild = require("../../models/guild.js");

module.exports = {
    name: "debugguild",
    aliases: [],
    category: "Owner",
    description: "Console log guild configuration.",
    usage: "DebugGuild",
    cooldown: 5,
    run: async (bot, message, args) => {

      if (message.deletable) message.delete()

      if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
      }

      let guildid = message.guild.id;
      let guild = await Guild.findOne({
        Guild: guildid
      });
      console.log(guild);
  }
}
