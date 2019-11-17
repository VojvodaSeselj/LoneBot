const { RichEmbed } = require("discord.js");
const { promptMessage, getMember } = require("../../functions.js");
const { stripIndents } = require("common-tags");
const ms = require("ms");
const Mute = require("../../models/mute.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "mute",
    aliases: [],
    category: "Moderation",
    description: "Mute member in chat or voice.",
    usage: "Mute <User> <Chat/Voice> [Reason] [Time]",
    cooldown: 5,
    run: async (bot, message, args) => {
      let guild = await Guild.findOne({
        Guild: message.guild.id
      });
      if(message.deletable) message.delete()

      if (!message.member.roles.some(r=>guild.ModeratorRole.concat(guild.AdminRole).includes(r.name)) && !message.member.hasPermission("ADMINISTRATOR")) {
        return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
      }
      if (!message.guild.me.hasPermission("MUTE_MEMBERS")) {
        return message.reply("I do not have permission to mute members.").then(m => m.delete(5000));
      }
      if (!args[0]) {
        return message.reply("You need to provide a member to mute!").then(m => m.delete(5000));
      }
      const toMute = await getMember(message, args[0]);
      if (!toMute) {
        return message.reply("Couldn't find that member!").then(m => m.delete(5000))
      }
      if (toMute === message.author.id) {
        return message.reply("You can't mute yourself!");
      }
      const reason = args.slice(3).join(" ");
      let muteTime = ms(args[2]);
      let muteLenght = muteTime / 1000 + " seconds";
      if(isNaN(muteTime)) {
        muteLenght = "Permanently muted!"
        reason = args.slice(2).join(" ");
        muteTime = Number.MAX_SAFE_INTEGER
      }
      if(!reason) reason = "No reason provided!";
      const logsChannel = message.guild.channels.find(channel => channel.name === guild.LogsChannel);
      if (!logsChannel) return message.reply("Couldn't find logs channel.");

      const type = args[1];
      if (!type) {
        return message.reply("You must supply type of mute! Either Chat or Voice! Caps sensitive!").then(m => m.delete(5000));
      }
      if (type !== "Chat" && type !== "Voice") {
        return message.reply("Type must be Chat or Voice!").then(m => m.delete(5000));
      }
      const chatMute = message.guild.roles.find(role => role.name === "Chat Muted") || message.guild.createRole({ name:"Chat Muted", color:"#27272b", permissions:[] });
      const voiceMute = message.guild.roles.find(role => role.name === "Voice Muted") || message.guild.createRole({ name:"Voice Muted", color:"#27272b", permissions:[] });
      if (type === "Chat") {
        toMute.addRole(chatMute);
    		message.guild.channels.forEach((channel) => {
    			channel.overwritePermissions(chatMute, {
    				SEND_MESSAGES: false,
    			});
    		});
      }
      else if (type === "Voice") {
        toMute.addRole(voiceMute);
        message.guild.channels.forEach((channel) => {
    			channel.overwritePermissions(voiceMute, {
    				SPEAK: false,
    			});
    		});
      }
  		const mute = new Mute({
  			Guild: message.guild.id,
  			MutedUser: {
          Username: toMute.user.username,
          ID: toMute.id,
        },
        MutedBy: {
          Username: message.author.username,
          ID: message.member.id,
        },
        Type: type,
        Time: muteTime,
        Created: Date.now(),
        Reason: reason || "No reason provided"
  		});
  		const embed = new RichEmbed()
        .setColor("#cf0808")
        .setThumbnail(toMute.user.displayAvatarURL)
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setDescription(stripIndents`**Mute**
        **Muted User** ${toMute.user} **with ID** ${toMute.user.id}
        **Muted By** ${message.member} **with ID** ${message.member.id}
        **Muted At** ${message.createdAt}
        **Mute Type** ${type}
        **Mute Lenght** ${muteLenght}
        **Reason** ${reason ? reason : "No reason provided!"}`);
  		logsChannel.send(embed);

      mute.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
  }
}
