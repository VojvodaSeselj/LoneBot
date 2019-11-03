const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");
const { stripIndents } = require("common-tags");
const UnBan = require("../../models/unban.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "unban",
    aliases: [],
    category: "Admin",
    description: "Unban member from the server.",
    usage: "UnBan <UserID>",
    example: "UnBan 345970401660239882",
    run: async (bot, message, args) => {
      let guild = await Guild.findOne({
        Guild: message.guild.id
      });
      if (message.deletable) message.delete()

      if (!message.member.roles.some(r=>guild.AdminRoles.includes(r.id)) || message.member.hasPermission("ADMINISTRATOR")) {
        return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
      }
      if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
        return message.reply("I do not have permission to unban members.").then(m => m.delete(5000));
      }
      if (!args[0]) {
        return message.reply("You need to provide a member's ID that you want to unban!").then(m => m.delete(5000));
      }
      const toUnban = await getMember(message, args[0]);
      if (!toUnban) {
        return message.reply("ID you provided cannot be found in ban list!").then(m => m.delete(5000));
      }
      if (toUnban === message.author.id) {
        return message.reply("You can't unban yourself!").then(m => m.delete(5000));
      }
      const banList = await message.guild.fetchBans();
      const bannedUser = banList.find(user => user.id === toUnban);
      if (!bannedUser) {
        return message.reply("That member is not banned!").then(m => m.delete(5000));
      }
      const logsChannel = message.guild.channels.find(channel => channel.name === guild.LogsChannel);
      if (!logsChannel) {
        return message.reply("Couldn't find logs channel.");
      }

    let embed = new RichEmbed()
        .setColor("#00c3df")
        .setThumbnail(toUnban.user.displayAvatarURL)
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setDescription(stripIndents`**UnBan**
        **UnBanned User's ID** ${bUser}
        **UnBanned By** ${message.member} **with ID** ${message.member.id}
        **Time** ${message.createdAt}`)

    message.guild.unban(bUser);
    logschannel.send(embed);

    const unban = new UnBan({
        Guild: message.guild.id,
        UnbannedUser: {
          ID: toUnban,
        },
        UnbannedBy: {
          Username: message.author.username,
          ID: message.author.id,
        },
        Time: message.createdAt

    });

    unban.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }
}
