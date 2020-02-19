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
			const parent = await message.guild.createChannel(`:bar_chart:Server Stats:bar_chart:`, "category")
      const botc = await message.guild.createChannel(`Bot Count: ${message.guild.members.filter(member => member.user.bot).size}`)
      botc = await botc.setParent(parent)
      const userc = await message.guild.createChannel(`User Count: ${message.guild.members.filter(member => !member.user.bot).size}`)
      userc = await userc.setParent(parent)
      const channelc = await message.guild.createChannel(`Channel Count: ${message.guild.channels.size}`)
      channelc = await channelc.setParent(parent)
      const rolec = await message.guild.createChannel(`Role Count: ${message.guild.roles.size}`)
      rolec = await rolec.setParent(parent)

		} else if (opcija.includes("off")) {
      message.guild.deleteCategory(parent.id)
      message.guild.deleteChannel(botc.id)
      message.guild.deleteChannel(userc.id)
      message.guild.deleteChannel(channelc.id)
      message.guild.deleteChannel(rolec.id)
    }
	}
};
