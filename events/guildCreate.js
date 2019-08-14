const Discord = require("discord.js");

module.exports.run = async (bot, guild) => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

}
module.exports.help = {
    name: "guildCreate"
}
