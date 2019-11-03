const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");

module.exports = {
    name: "avatar",
    aliases: [],
    category: "Member",
    description: "Shows your or someone else's avatar.",
    usage: "Avatar [User]",
    run: async (bot, message, args) => {
  const user = await getMember(message, args[0]) || message.author;
  const avatarEmbed = new RichEmbed()
      .setColor("#00c3df")
      .setAuthor(user.user.tag, user.user.avatarURL)
      .setImage(user.user.avatarURL);
  message.channel.send(avatarEmbed);
  }
}
