const Guild = require("../../models/guild.js");

module.exports = {
    name: "clear",
    aliases: ["clr"],
    category: "Moderation",
    description: "Clear chat.",
    usage: "Clear <NumberOfLines>",
    example: "Clear 69",
    run: async (bot, message, args) => {
    let guild = await Guild.findOne({
      Guild: message.guild.id
    });
    if (message.deletable) message.delete();

    if (!message.member.roles.some(r=>guild.ModeratorRoles.concat(guild.AdminRoles).includes(r.id)) || message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
    }
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("I do not have permission to clear messages.").then(m => m.delete(5000));
    }
    if (!args[0]) {
      return message.reply("You need to supply a number of messages you want to delete.(Max: 100)").then(m => m.delete(5000));
    }
    if (isNaN(args[0])) {
      return message.reply('You need to supply a number!').then(m => m.delete(5000))
    }

    message.channel.send("Clearing " + args[0] + "messages :exclamation:").then(m => m.delete(2000))
    setTimeout(() => {
      message.channel.bulkDelete(args[0])
      .then(() => {
          message.channel.send("Cleared " + args[0] + " messages!").then(m => m.delete(1500))
      })
      .catch(err => message.reply("Messages older than 14 days cannot be deleted!").then(m => m.delete(5000)))
    }, 5000);
  }
}
