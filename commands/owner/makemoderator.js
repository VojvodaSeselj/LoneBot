const Guild = require("../../models/guild.js");
const { getMember } = require("../../functions.js")

module.exports = {
    name: "makemoderator",
    aliases: [],
    category: "Owner",
    description: "Make member a server moderator.",
    usage: "MakeModerator <User>",
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
    return message.reply("You need to provide member that you want to make a server moderator!")
  }
  let mUser = await getMember(message, args[0]);

  let moderatorrole = message.guild.roles.find(role => role.name === guild.ModeratorRole);
  if (!moderatorrole) {
    return message.reply(`There is no Moderator role set up! Do ${guild.Prefix}setup to set it up!`)
  }
  await(mUser.addRole(moderatorrole.id));
  }
}
