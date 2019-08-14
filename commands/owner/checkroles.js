const Discord = require("discord.js");

module.exports.run = async(bot, message) => {

  if (!message.member.roles.some(r=>["Lonewolf", "God"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");

    message.guild.members.forEach(async member => {
      let level = message.guild.roles.find(role => role.name === "──────── Level  ────────");
      let aboutme = message.guild.roles.find(role => role.name === "──────── About Me ────────");
      let newbie = message.guild.roles.find(role => role.name === "Newbie");
      if (member.id === "586263579817279504") return;
      if (member.id === "597236807956037653") return;
      if (!member.roles.some(r=>["Member", "Newbie"].includes(r.name))) {
        await member.addRole(newbie.id);
        await member.addRole(aboutme.id)
        await member.addRole(level.id)
        console.log(`${member.username} Had no roles.`);
      }
    });
}

module.exports.help = {
    name: "checkroles"
}
