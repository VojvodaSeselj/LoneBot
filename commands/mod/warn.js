const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");
const { stripIndents } = require("common-tags");
const Warn = require("../../models/warn.js");
const User = require("../../models/user.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "warn",
    aliases: [],
    category: "Moderation",
    description: "Warn a member.",
    usage: "Warn <User> <Reason>",
    example: "Warn @Username#9287 Example",
    cooldown: 5,
    run: async (bot, message, args) => {
    let guild = await Guild.findOne({
      Guild: message.guild.id
    });
    if (!message.member.roles.some(r=>guild.ModeratorRole.concat(guild.AdminRole).includes(r.name)) && !message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("You do not have required permission to warn members!").then(m => m.delete(5000));
    }
    if (!args[0]) {
      return message.reply("You need to provide a member to warn!").then(m => m.delete(5000));
    }
    if (!args[1]) {
      return message.reply("You need to provide a reason for warning this member!").then(m => m.delete(5000));
    }

    const toWarn = await getMember(message, args[0]);
    if (!toWarn) {
      return message.reply("Couldn't find that member!").then(m => m.delete(5000));
    }
    if (toWarn.roles.some(r=>guild.ModeratorRole.concat(guild.AdminRole).includes(r.name)) && toWarn.hasPermission("ADMINISTRATOR")) {
      return message.reply("You can't warn that member!");
    }
    if (toWarn === message.author.id) {
      return message.reply("You can't warn yourself!").then(m => m.delete(5000));
    }

    const reason = args.slice(1).join(" ");
    let logsChannel = message.guild.channels.find(channel => channel.name === guild.LogsChannel);
    if (!logsChannel) return message.reply("Couldn't find logs channel.");

    const embed = new RichEmbed()
               .setColor("#cf0808")
               .setThumbnail(toWarn.user.displayAvatarURL)
               .setFooter(message.author.tag, message.author.displayAvatarURL)
               .setDescription(stripIndents`**Warn**
               **Warned User**  ${toWarn.user} **with ID** ${toWarn.user.id}
               **Warned By** ${message.member} **with ID** ${message.member.id}
               **Time** ${message.createdAt}
               **Reason** ${reason}`);

    logsChannel.send(embed);
    message.delete();

    let warnings = await Warn.find({
      Guild: guildid,
      WarnedUser: {
        ID: wUser.user.id,
      },
    })

    const warn = new Warn({
        Guild: message.guild.id,
        ID: warnings.lenght +1,
        WarnedUser: {
          ID: toWarn.user.id,
        },
        WarnedBy: {
          Username: message.author.username,
          ID: message.author.id,
        },
        Reason: reason,
        Time: message.createdAt
    });

    warn.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));


    if (warn.ID < 3) {
      message.channel.send(`<@${toWarn.id}> you have been warned for **${reason}**,be careful because ${3 - warn.ID} more warnings will get you banned!`);
    }
    if (warn.ID >= 3) {
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
          return message.reply("I do not have permission to ban members for being warned 3 times.").then(m => m.delete(5000));
        } else if (message.guild.me.hasPermission("BAN_MEMBERS")) {
        message.guild.member(toWarn).ban("Warned too many times");
        message.channel.send(`<@${toWarn.id}> has been banned for getting warned third time!`)
      }
    }
  }
}
