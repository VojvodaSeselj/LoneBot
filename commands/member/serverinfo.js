const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { utc } = require("moment");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "serverinfo",
    aliases: [],
    category: "Member",
    description: "Shows server informations.",
    usage: "ServerInfo",
    cooldown: 5,
    run: async (bot, message, args) => {
    let region = {
      "brazil": ":flag_br: Brazil",
      "eu-central": ":flag_eu: Central Europe",
      "singapore": ":flag_sg: Singapore",
      "us-central": ":flag_us: U.S. Central",
      "sydney": ":flag_au: Sydney",
      "us-east": ":flag_us: U.S. East",
      "us-south": ":flag_us: U.S. South",
      "us-west": ":flag_us: U.S. West",
      "eu-west": ":flag_eu: Western Europe",
      "vip-us-east": ":flag_us: VIP U.S. East",
      "london": ":flag_gb: London",
      "amsterdam": ":flag_nl: Amsterdam",
      "hongkong": ":flag_hk: Hong Kong",
      "Russia": ":flag_ru: Russia",
      "southafrica": ":flag_za: South Africa"
    };
    let sicon = message.guild.iconURL;
    let guildid = message.guild.id;
    let guild = await Guild.findOne({
      Guild: guildid
    });
    let embed = new RichEmbed()
    .setColor("#00c3df")
    .setThumbnail(message.guild.iconURL)
    .setFooter(message.author.username, message.author.displayAvatarURL)
    .setDescription(stripIndents`**Server informations**
    **Name** ${message.guild.name}
    **ID** ${message.guild.id}
    **Creation Date** ${utc(message.guild.createdAt).format("dddd, MM Do YYYY")}
    **Region** ${region[message.guild.region]}
    **Owner** ${message.guild.owner.user.tag}
    **Members** ${message.guild.members.filter(member => !member.user.bot).size}
    **Bots** ${message.guild.members.filter(member => member.user.bot).size}
    **Prefix** ${guild.Prefix}`)

    return message.channel.send(embed)
}
}
