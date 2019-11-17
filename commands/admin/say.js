const Discord = require("discord.js");

module.exports = {
    name: "say",
    aliases: [],
    category: "Admin",
    description: "Make bot send message in chat.",
    usage: "Say <Message>",
    cooldown: 5,
    example: "Say @everyone This is an important announcement!",
    run: async (bot, message, args) => {

    if (!message.member.roles.some(r=>guild.AdminRole.includes(r.name)) && !message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("Sorry, you don't have permissions to use this!");
    }
    let botMessage = args.join(" ");
    if (!botMessage) return;
    message.delete().catch();
    message.channel.send(botMessage);
  }
}
