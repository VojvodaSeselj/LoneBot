module.exports.run = (bot, member) => {

  let user = member.user.tag;
  let goodbyechannel = member.guild.channels.find(channel => channel.name === "😭goodbye");
  goodbyechannel.send(`**${user}** just left the server.`);
}

module.exports.help = {
    name: "guildMemberRemove"
}
