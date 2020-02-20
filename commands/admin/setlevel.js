const { getMember } = require("../../functions.js");
const Guild = require("../../models/guild.js");
const User = require("../../models/user.js");

module.exports = {
    name: "setlevel",
    aliases: ["makelevel"],
    category: "Moderation",
    description: "Set specific level to member.",
    usage: "SetLevel <Member> <Level>",
    example: "SetLevel @Username#9287 18",
    cooldown: 5,
    run: async (bot, message, args) => {
    let guild = await Guild.findOne({
      Guild: message.guild.id
    });
    if (message.deletable) message.delete();

    if (!message.member.roles.some(r=>guild.ModeratorRole.concat(guild.AdminRole).includes(r.name)) && !message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
    }

    if (!args[0]) {
      return message.reply("You need to supply member you want to set level to.").then(m => m.delete(5000));
    }
    let cUser = await getMember(message, args[0]);
    if (!cUser) {
      return message.channel.send("User not found!");
    }

    if (!args[1]) {
      return message.reply("You need to supply level your want to set to for this member.").then(m => m.delete(5000));
    }
    if (isNaN(args[1])) {
      return message.reply('You need to supply level in numbers!').then(m => m.delete(5000));
    }
    if (args[1] < 0) {
      return message.reply("Level cannot be set to number lower than 0!").then(m = m.delete(5000));
    }
    let level = args[1];

    if(cUser && level) {
        let user = await User.findOne({
          Guild: message.guild.id,
          ID: cUser
        })
      user.Level = level

      message.reply(`You set ${cUser}'s level to ${level}!`);
    }
  }
}
