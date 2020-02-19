const { RichEmbed } = require("discord.js");

module.exports = {
    name: "serverstats",
    aliases: [],
    category: "Owner",
    description: "Add channel with basic server stats!",
    usage: "ServerStats <On/Off>",
    example: "ServerStats On",
    cooldown: 5,
    run: async (bot, message, args) => {
    let opcija = args[0].toLowerCase();
		if (opcija.includes("on")) {
      let emoji = message.emojis.find(emoji => emoji.name === "bar_chart");
			const parent = await message.guild.createCategory(`${emoji}Server Stats${emoji}`)
      const botc = await message.guild.createChannel(`Bot Count: ${message.guild.members.filter(member => member.user.bot).size}`)
      botc = await botc.setParent(parent)
      const userc = await message.guild.createChannel(`User Count: ${message.guild.members.filter(member => !member.user.bot).size}`)
      userc = await userc.setParent(parent)
      const channelc = await message.guild.createChannel(`Channel Count: ${message.guild.channels.size}`)
      channelc = await channelc.setParent(parent)
      const rolec = await message.guild.createChannel(`Role Count: ${message.guild.roles.size}`)
      rolec = await rolec.setParent(parent)

		} else if (opcija.includes("off")) {
      message.guild.deleteCategory(parent)
      message.guild.deleteChannel(botc)
      message.guild.deleteChannel(userc)
      message.guild.deleteChannel(channelc)
      message.guild.deleteChannel(rolec)
    }
	}
};
