const Warn = require("../../models/warn.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "warnlevel",
    aliases: ["warnlvl", "wlevel"],
    category: "Moderation",
    description: "Show member's warn level.",
    usage: "WarnLevel <User>",
    cooldown: 5,
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let guild = await Guild.findOne({
      Guild: guildid
    });

    if (!message.member.roles.some(r=>guild.ModeratorRole.concat(guild.AdminRole).includes(r.name)) && !message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("Sorry, you don't have permissions to use this!");
    }
    if (!args[0]) {
      return message.reply("You need to provide a member to kick!").then(m => m.delete(5000));
    }
    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!wUser) {
      return message.channel.send("User not found!");
    }

    Warn.find({
      Guild: guildid,
      WarnedUser: {
        ID: wUser.user.id,
      },
    }).sort([
      ["ID", "descending"]
    ]).exec((err, res) => {
      if(err) console.log(err);

      if(!res){
        embed.setColor("#00c3df");
        embed.addField("Error", "This member was never warned!!");
      }else if(res.length < 10){
        embed.setColor("#00c3df");
        for (i = 0; i < res.length; i++) {
          let member = message.guild.members.get(res[i].ID) || "User Left"
          if (member === "User Left") {
            embed.addField(`${i + 1}. ${member}`, `**Warned By**: ${res[i].WarnedBy.Username}`)
            embed.addField(`${i + 1}. ${member}`, `**Reason**: ${res[i].Reason}`)
          } else {
            embed.addField(`${i + 1}. ${member.user.username}`, `**Warned By**: ${res[i].WarnedBy.Username}`)
            embed.addField(`${i + 1}. ${member.user.username}`, `**Reason**: ${res[i].Reason}`)
          }
        }
      }else{
        embed.setColor("#00c3df");
        for (i = 0; i < 10; i++) {
          let member = message.guild.members.get(res[i].ID) || "User Left"
          if (member === "User Left") {
            embed.addField(`${i + 1}. ${member}`, `**Warned By**: ${res[i].WarnedBy.Username}`)
            embed.addField(`${i + 1}. ${member}`, `**Reason**: ${res[i].Reason}`)
          } else {
            embed.addField(`${i + 1}. ${member.user.username}`, `**Warned By**: ${res[i].Cash}`)
            embed.addField(`${i + 1}. ${member}`, `**Reason**: ${res[i].Reason}`)
          }
        }
      }
    });
  }
}
