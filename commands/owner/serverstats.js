const { RichEmbed } = require("discord.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "serverstats",
    aliases: [],
    category: "Owner",
    description: "Add channel with basic server stats!",
    usage: "ServerStats <On/Off>",
    example: "ServerStats On",
    cooldown: 5,
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let guild = await Guild.findOne({
      Guild: guildid
    });
    if (message.deletable) message.delete()

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
    }

    if (!args[0]) return;
    let opcija = args[0].toLowerCase();
		if (opcija.includes("on")) {
      let emoji = message.emojis.find(emoji => emoji.name === "bar_chart");
			const parent = await message.guild.createCategory(`${emoji}Server Stats${emoji}`)
      const botc = await message.guild.createChannel(`Bot Count: ${message.members.filter(member => member.user.bot).size}`)
      botc = await botc.setParent(parent)
      const userc = await message.guild.createChannel(`User Count: ${message.members.filter(member => !member.user.bot).size}`)
      userc = await userc.setParent(parent)
      const channelc = await message.guild.createChannel(`Channel Count: ${message.channels.size}`)
      channelc = await channelc.setParent(parent)
      const rolec = await message.guild.createChannel(`Role Count: ${message.roles.size}`)
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
