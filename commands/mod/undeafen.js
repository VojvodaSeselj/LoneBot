const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");
const { stripIndents } = require("common-tags");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "undeafen",
    aliases: ["undfn"],
    category: "Moderation",
    description: "Undeafen member from voice.",
    usage: "UnDeafen <User>",
    cooldown: 5,
    run: async (bot, message, args) => {
    let guild = await Guild.findOne({
      Guild: message.guild.id
    });
    if(message.deletable) message.delete()

    if (!message.member.roles.some(r=>guild.ModeratorRole.concat(guild.AdminRole).includes(r.name)) && !message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
    }
    if (!message.guild.me.hasPermission("DEAFEN_MEMBERS")) {
      return message.reply("I do not have permission to undeafen members.").then(m => m.delete(5000));
    }
    if (!args[0]) {
      return message.reply("You need to provide a member to undeafen!").then(m => m.delete(5000));
    }
    const toUndeafen = await getMember(message, args[0]);
    if (!toUndeafen) {
      return message.reply("Couldn't find that member!").then(m => m.delete(5000));
    }
    if (toUndeafen === message.author.id) {
      return message.reply("You can't undeafen yourself!").then(m => m.delete(5000));
    }
    if (!toUndeafen.voiceChannel) {
      return message.reply("Member need to be connected to voice channel in order to undeafen him!").then(m => m.delete(5000))
    }
    const logsChannel = message.guild.channels.find(channel => channel.name === guild.LogsChannel);
    if (!logsChannel) {
      return message.reply("Couldn't find logs channel.");
    }
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: ${guild.Prefix}${module.exports.usage}`);
    let dUser = await getMember(message, args[0]);
    if (!dUser) return message.channel.send("User not found!");
    if (dUser.roles.some(r=>["Lonewolf", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("You can't undeafen this user!");

    let undeafenembed = new RichEmbed()
        .setColor("#00c3df")
        .setThumbnail(dUser.user.displayAvatarURL)
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setDescription(stripIndents`**UnDeafen**
        **UnDeafened User** ${dUser.username} **with ID** ${dUser.user.id}
        **UnDeafened By** ${message.member} **with ID** ${message.member.id}
        **Time** ${message.createdAt}`)

    dUser.setDeaf(false);
    message.channel.send(`<@${dUser.id}> you have been undeafened!`);
    logschannel.send(undeafenembed);

  }
}
