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
  if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: ${guild.Prefix}${module.exports.usage}`);
  let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!mUser) return message.reply("User not found!");
  let modrole = message.guild.roles.find(role => role.name === "⚒ Chat Moderator ⚒");
  if (!modrole) {
      try {
          modrole = await message.guild.createRole({
              name: "⚒ Chat Moderator ⚒",
              color: "#000000",
              permissions: "MUTE_MEMBERS"
              })
      } catch (e) {
          console.log(e.stack);
      }
  }
  await(mUser.addRole(modrole.id));
}
}
