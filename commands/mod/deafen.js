const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");
const { stripIndents } = require("common-tags");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "deafen",
    aliases: ["dfn"],
    category: "Moderation",
    description: "Deafen a member in voice.",
    usage: "Deafen <User> <Reason>",
    run: async (bot, message, args) => {
      let guild = await Guild.findOne({
        Guild: message.guild.id
      });
      if(message.deletable) message.delete()

      if (!message.member.roles.some(r=>guild.ModeratorRoles.concat(guild.AdminRoles).includes(r.id)) || message.member.hasPermission("ADMINISTRATOR")) {
        return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
      }
      if (!message.guild.me.hasPermission("DEAFEN_MEMBERS")) {
        return message.reply("I do not have permission to deafen members.").then(m => m.delete(5000));
      }
      if (!args[0]) {
        return message.reply("You need to provide a member to deafen!").then(m => m.delete(5000));
      }
      if (!args[1]) {
        return message.reply("You need to provide a reason for deafening this member!").then(m => m.delete(5000));
      }
      const toDeafen = await getMember(message, args[0]);
      if (!toDeafen) {
        return message.reply("Couldn't find that member!").then(m => m.delete(5000));
      }
      if (toDeafen === message.author.id) {
        return message.reply("You can't deafen yourself!").then(m => m.delete(5000));
      }
      if (!toDeafen.voiceChannel) {
        return message.reply("Member need to be connected to voice channel in order to deafen him!").then(m => m.delete(5000))
      }
      const logsChannel = message.guild.channels.find(channel => channel.name === guild.LogsChannel);
      if (!logsChannel) {
        return message.reply("Couldn't find logs channel.");
      }

      const reason = args.slice(1).join(" ");
      const embed = new RichEmbed()
                 .setColor("#cf0808")
                 .setThumbnail(toDeafen.user.displayAvatarURL)
                 .setFooter(message.author.tag, message.author.displayAvatarURL)
                 .setDescription(stripIndents`**Deafened User** ${toDeafen.user} **with ID** ${toDeafen.user.id}
                 **Deafened By** ${message.member} **with ID** ${message.member.id}
                 **Time** ${message.createdAt}
                 **Reason** ${reason}`);

         message.delete();
         toDeafen.setDeaf(true);
         logsChannel.send(embed);
         message.channel.send(`<@${toDeafen.id}> you have been deafened for ${reason}!`);
    }
}
