const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");
const { stripIndents } = require("common-tags");
const Report = require("../../models/report.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "report",
    aliases: [],
    category: "Member",
    description: "Report a member.",
    usage: "Report <User> <Reason>",
    cooldown: 5,
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let guild = await Guild.findOne({
      Guild: guildid
    });
    if (!args[0]) {
      return message.reply("You need to provide a member to report!").then(m => m.delete(5000));
    }
    if (!args[1]) {
      return message.reply("You need to provide a reason for reporting this member!").then(m => m.delete(5000));
    }
    const rUser = await getMember(message, args[0]);
    if (!rUser) {
      return message.reply("User not found!").then(m => m.delete(5000))
    }
    const reason = args.slice(1).join(" ");
    let embed = new RichEmbed()
        .setColor("#00c3df")
        .setThumbnail(rUser.user.displayAvatarURL)
        .setFooter(message.author.tag, message.author.displayAvatarURL)
        .setDescription(stripIndents`**Reported User** ${rUser.user} **with ID** ${rUser.user.id}
        **Reported By** ${message.member} **with ID** ${message.member.id}
        **Time** ${message.createdAt}
        **Reason** ${reason}
        **Channel** ${message.channel}`);

    let logschannel = message.guild.channels.find(channel => channel.name === guild.LogsChannel);
    if (!logschannel) return message.reply("Couldn't find logs channel.");

    message.delete().catch(O_o => {});
    logschannel.send(embed);

    const report = new Report({
        Guild: message.guild.id,
        ReportedUser: {
          Username: rUser.user.username,
          ID: rUser.user.id,
        },
        ReportedBy: {
          Username: message.author.username,
          ID: message.author.id,
        },
        Reason: reason,
        Time: message.createdAt

    });

    report.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
      }
}
