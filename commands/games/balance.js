const { getMember } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const User = require("../../models/user.js");

module.exports = {
    name: "balance",
    aliases: ["bal", "bank"],
    category: "Games",
    description: "Shows your or someone else's balance.",
    usage: "Balance [User]",
    example: "Balance @Username#9287",
    cooldown: 5,
    run: async (bot, message, args) => {
    const cuser = await getMember(message, args[0]);
    let guild = message.guild.id;
    let user = await User.findOne({
      Guild: guild,
      ID: cuser.id
    });
    if (!user) {
      user = new User({
        Guild: guild,
        ID: cuser.id,
        XP: 0,
        Level: 1,
        Cash: 0,
        Bank: 1000,
        Joined: message.author.joinedAt
      });
    }
    user.save()

    let coins = user.Cash;
    let bank = user.Bank;
    let balEmbed = new RichEmbed()
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setColor("#00c3df")
      .setDescription(stripIndents`**Balance**
      **Total Balance** ${coins + bank}$
      **Cash** ${coins}$
      **Bank** ${bank}$`)
      .attachFiles(['./slike/cash.png'])
      .setThumbnail('attachment://cash.png')
    message.channel.send(balEmbed)
  }
}
