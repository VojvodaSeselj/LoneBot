const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const User = require("../../models/user.js");

module.exports = {
    name: "leaderboard",
    aliases: ["baltop", "moneyleaderboard"],
    category: "Games",
    description: "Shows top 10 richest people on this server.",
    usage: "LeaderBoard",
    example: "LeaderBoard",
    cooldown: 5,
    run: async (bot, message, args) => {
      await message.delete()

        let embed = new RichEmbed()
          .setTitle("Money Leaderboard")
          .setThumbnail(bot.user.displayAvatarURL);

        User.find({
          Guild: message.guild.id
        }).sort([
          ["Level", "descending"]
        ]).exec((err, res) => {
          if(err) console.log(err);

          if(!res){
            embed.setColor("#00c3df");
            embed.addField("Error", "Nobody own any money on this server!");
          }else if(res.length < 10){
            embed.setColor("#00c3df");
            for (i = 0; i < res.length; i++) {
              let member = message.guild.members.get(res[i].ID) || "User Left"
              if (member === "User Left") {
                embed.addField(`${i + 1}. ${member}`, `**Level**: ${res[i].Level}`);
              } else {
                embed.addField(`${i + 1}. ${member.user.username}`, `**Level**: ${res[i].Level}`);
              }
            }
          }else{
            embed.setColor("#00c3df");
            for (i = 0; i < 10; i++) {
              let member = message.guild.members.get(res[i].ID) || "User Left"
              if (member === "User Left") {
                embed.addField(`${i + 1}. ${member}`, `**Level**: ${res[i].Level}`);
              } else {
                embed.addField(`${i + 1}. ${member.user.username}`, `**Level**: ${res[i].Level}`);
              }
            }
          }

          message.channel.send(embed)

        })
  }
}
