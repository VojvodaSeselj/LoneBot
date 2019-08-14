const Discord = require("discord.js");

module.exports.run = async (bot, member) => {
  //Kada udje novi member dodeljuje mu role i salje welcome poruku.
  let newbie = member.guild.roles.find(role => role.name === "Newbie");
  let level = member.guild.roles.find(role => role.name === "──────── Level  ────────");
  let aboutme = member.guild.roles.find(role => role.name === "──────── About Me ────────");
  let welcomechannel = member.guild.channels.find(channel => channel.name === "🎂welcome");
  let wcicon = member.user.displayAvatarURL;
  let tuser = member;
  let user = member.user.tag;
  let servers = member.guild.name;
  welcomechannel.send(`<@${tuser.id}>`)
  let wcEmbed = new Discord.RichEmbed()
  .setTitle(`Welcome to ${member.guild.name}!`)
  .setColor("#fffa00") .setThumbnail(wcicon)
  .addField(`You are our`,`${member.guild.memberCount}. member.`)
  .addField("**Read** :arrow_down_small:", `Please read <#585943065978732589> and go to <#585833461776908289> to setup your roles.Also you can go to <#587331618234957833> and introduce yourself.`)
  welcomechannel.send(wcEmbed);
  if (!tuser.roles.has(newbie.id)) {
      await(tuser.addRole(newbie.id));
  }
  if (!tuser.roles.has(aboutme.id)) {
      await(tuser.addRole(aboutme.id));
  }
  if (!tuser.roles.has(level.id)) {
      await(tuser.addRole(level.id));
  }
}

module.exports.help = {
    name: "guildMemberAdd"
}
