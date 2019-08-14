const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

  if (!message.member.roles.some(r=>["Lonewolf", "God"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
  if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .godmode <User>`);
  let gUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!gUser) return message.reply("User not found!");
  let godrole = message.guild.roles.find(role => role.name === "God");
  if (!godrole) {
      try {
          godrole = await message.guild.createRole({
              name: "God",
              color: "#000000",
              permissions: "ADMINISTRATOR"
              })
      } catch (e) {
          console.log(e.stack);
      }
  }
  await(gUser.addRole(godrole.id));
}

module.exports.help = {
    name: "godmode"
}
