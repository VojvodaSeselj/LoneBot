const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

  if (!message.member.roles.some(r=>["Lonewolf", "God"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
  if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .chatmod <User>`);
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

module.exports.help = {
    name: "chatmod"
}
