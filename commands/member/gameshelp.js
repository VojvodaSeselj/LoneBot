const { RichEmbed } = require("discord.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "gameshelp",
    aliases: [],
    category: "Member",
    description: "Shows help for games commands.",
    usage: "GamesHelp",
    run: async (bot, message, args) => {
        let guildid = message.guild.id;
        let guild = await Guild.findOne({
          Guild: guildid
        });
        let gameshelpEmbed = new RichEmbed()
            .setDescription("Games Help")
            .setColor("#00c3df")
            .addField(`**${guild.Prefix}balance [user]**`, `Shows your or someone elses balance.`)
            .addField(`**${guild.Prefix}pay [user] [amount]**`, `Pay somebody specified amount of coins.`)
            .addField(`**${guild.Prefix}work**`, `Every 3 hours work to get some coins.`)
            .addField(`**${guild.Prefix}steal [user]**`, `Every 3 hours you can steal some of somebody elses coins.`)
            .addField(`**${guild.Prefix}slots [amount]**`, `Play slots and bet.`)
            .addField(`**${guild.Prefix}coinflip [side] [amount]**`, `Play heads or tails and bet.`)
            .addField(`**${guild.Prefix}roulette [color] [amount]**`, `Play roulette and bet.`);
            message.channel.send(gameshelpEmbed);
          }
}
