const { RichEmbed } = require("discord.js");
const { promptMessage, getMember } = require("../../functions.js");
const { stripIndents } = require("common-tags");
const Kick = require("../../models/kick.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "kick",
    aliases: ["kck"],
    category: "Admin",
    description: "Kick a member from the server.",
    usage: "Kick <Member> <Reason>",
    example: "Kick @Username#9287 Spam",
    cooldown: 5,
    run: async (bot, message, args) => {
      let guild = await Guild.findOne({
        Guild: message.guild.id
      });
      if(message.deletable) message.delete()

      if (!message.member.roles.some(r=>guild.AdminRole.includes(r.name)) && !message.member.hasPermission("ADMINISTRATOR")) {
        return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
      }
      if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
        return message.reply("I do not have permission to kick members.").then(m => m.delete(5000));
      }
      if (!args[0]) {
        return message.reply("You need to provide a member to kick!").then(m => m.delete(5000));
      }
      if (!args[1]) {
        return message.reply("You need to provide a reason for kicking this member!").then(m => m.delete(5000));
      }
      const toKick = await getMember(message, args[0]);
      if (!toKick) {
        return message.reply("Couldn't find that member!").then(m => m.delete(5000));
      }
      if (toKick === message.author.id) {
        return message.reply("You can't kick yourself!").then(m => m.delete(5000));
      }
      if (!toKick.kickable) {
        return message.reply("I can't kick that member due to role hierarchy, I suppose!").then(m => m.delete(5000));
      }
      let logsChannel = message.guild.channels.find(channel => channel.name === guild.LogsChannel);
      if (!logsChannel) {
        return message.reply("Couldn't find logs channel.");
      }

      const reason = args.slice(1).join(" ");
      const embed = new RichEmbed()
                 .setColor("#cf0808")
                 .setThumbnail(toKick.user.displayAvatarURL)
                 .setFooter(message.author.username, message.author.displayAvatarURL)
                 .setDescription(stripIndents`**Kick**
                 **Kicked User** ${toKick.user} **with ID** ${toKick.user.id}
                 **Kicked By** ${message.member} **with ID** ${message.member.id}
                 **Time** ${message.createdAt}
                 **Reason** ${reason}`);

             const promptEmbed = new RichEmbed()
                 .setColor("GREEN")
                 .setAuthor(`This verification becomes invalid after 30s.`)
                 .setDescription(`Are you sure you want to kick ${toKick}?`)

             // Send the message
             await message.channel.send(promptEmbed).then(async message => {
                 // Await the reactions and the reaction collector
                 const emoji = await promptMessage(message, message.author, 30, ["✅", "❌"]);

                 // The verification stuffs
                 if (emoji === "✅") {
                     message.delete();
                     const kick = new Kick({
                         Guild: message.guild.id,
                         KickedUser: {
                           Username: toKick.user.username,
                           ID: toKick.user.id,
                         },
                         KickedBy: {
                           Username: message.member.username,
                           ID: message.member.id,
                         },
                         Reason: reason,
                         Time: message.createdAt
                     });

                     kick.save()
                         .then(result => console.log(result))
                         .catch(err => console.log(err));
                     toKick.kick(reason)
                         .catch(err => {
                             if (err) return message.channel.send(`Kick failed, Error: ${err}`)
                         });

                     logsChannel.send(embed);
                 } else if (emoji === "❌") {
                     message.delete();

                     message.reply(`Kick canceled.`)
                         .then(m => m.delete(10000));

                       }
    });
  }
};
