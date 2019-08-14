const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.some(r=>["Lonewolf", "God"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
  let botMessage = args.join(" ");
  message.delete().catch();
  message.channel.send(botMessage);
}

module.exports.help = {
  name: "say"
}
