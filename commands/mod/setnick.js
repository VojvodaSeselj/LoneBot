const Guild = require("../../models/guild.js");
const { getMember } = require("../../functions.js");

module.exports = {
    name: "setnick",
    aliases: ["snick"],
    category: "Moderation",
    description: "Change member's nickname.",
    usage: "SetNick <User> <Nickname>",
    run: async (bot, message, args) => {
    if(message.deletable) message.delete()

    if (!message.member.roles.some(r=>guild.ModeratorRoles.concat(guild.AdminRoles).includes(r.id)) || message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
    }
    if(!message.guild.me.hasPermission("MANAGE_NICKNAMES")) {
      return message.reply("I do not have permission to change member's nickname.").then(m => m.delete(5000));
    }
    if (!args[0]) {
      return message.reply("You need to provide member you want to change nickname to!").then(m => m.delete(5000));
    }
    const nUser = await getMember(message, args[0]);
    if (!nUser) {
      return message.channel.send("User not found!");
    }
    const nNick = args.slice(1).join(" ");
    if (!nNick) {
      return message.reply("You need to supply new nickname!");
    }
    message.guild.members.get(nUser.id).setNickname(`${nNick}`);
    message.channel.send(`<@${nUser.id}> your nickname has been changed to ${nNick}!`);
  }
}
