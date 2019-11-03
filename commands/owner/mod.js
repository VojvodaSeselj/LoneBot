const Discord = require("discord.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "mod",
    aliases: [],
    category: "Owner",
    description: "Make member moderator.",
    usage: "Mod <User>",
    run: async (bot, message, args) => {
  let guildid = message.guild.id;
  let guild = await Guild.findOne({
    Guild: guildid
  });
  if (!message.member.roles.some(r=>["Lonewolf", "God"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
  if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: ${guild.Prefix}${module.exports.usage}`);
  let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!mUser) return message.reply("User not found!");
  let modrole = message.guild.roles.find(role => role.name === "⚒ Moderator ⚒");
  if (!modrole) {
      try {
          modrole = await message.guild.createRole({
              name: "⚒ Moderator ⚒",
              color: "#000000",
              permissions: "BAN_MEMBERS"
              })
      } catch (e) {
          console.log(e.stack);
      }
  }
  await(mUser.addRole(modrole.id));
}
}
