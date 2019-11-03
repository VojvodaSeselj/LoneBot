const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");
const { stripIndents } = require("common-tags");
const Ban = require("../../models/ban.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "ban",
    aliases: ["bn"],
    category: "Admin",
    description: "Ban a member from the server.",
    usage: "Ban <Member> <Reason>",
    example: "Ban @Username#9287 Example",
    run: async (bot, message, args) => {
      let guild = await Guild.findOne({
        Guild: message.guild.id
      });
      if (message.deletable) message.delete()

      if (!message.member.roles.some(r=>guild.AdminRoles.includes(r.id)) || !message.member.hasPermission("ADMINISTRATOR")) {
        return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
      }
      if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
        return message.reply("I do not have permission to ban members.").then(m => m.delete(5000));
      }
      if (!args[0]) {
        return message.reply("You need to provide a member to ban!").then(m => m.delete(5000));
      }
      if (!args[1]) {
        return message.reply("You need to provide a reason for banning this member!").then(m => m.delete(5000));
      }
      const toBan = await getMember(message, args[0]);
      if (!toBan) {
        return message.reply("Couldn't find that member!").then(m => m.delete(5000));
      }
      if (toBan === message.author.id) {
        return message.reply("You can't ban yourself!").then(m => m.delete(5000));
      }
      if (!toBan.bannable) {
        return message.reply("I can't ban that member due to role hierarchy, I suppose!").then(m => m.delete(5000));
      }
      const logsChannel = message.guild.channels.find(channel => channel.name === guild.LogsChannel);
      if (!logsChannel) {
        return message.reply("Couldn't find logs channel.");
      }

      const reason = args.slice(1).join(" ");
      const embed = new RichEmbed()
                 .setColor("#cf0808")
                 .setThumbnail(toBan.user.displayAvatarURL)
                 .setFooter(message.author.username, message.author.displayAvatarURL)
                 .setDescription(stripIndents`**Ban**
                 **Banned User**  ${toBan.user} **with ID** ${toBan.user.id}
                 **Banned By** ${message.member} **with ID** ${message.member.id}
                 **Time** ${message.createdAt}
                 **Reason** ${reason}`);

             const promptEmbed = new RichEmbed()
                 .setColor("GREEN")
                 .setAuthor(`This verification becomes invalid after 30s.`)
                 .setDescription(`Are you sure you want to ban ${toBan}?`)

             // Send the message
             await message.channel.send(promptEmbed).then(async msg => {
                 // Await the reactions and the reaction collector
                 const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

                 // The verification stuffs
                 if (emoji === "✅") {
                     msg.delete();
                     const ban = new Ban({
                         Guild: message.guild.id,
                         BannedUser: {
                           Username: toBan.user.username,
                           ID: toBan.user.id,
                         },
                         BannedBy: {
                           Username: message.author.username,
                           ID: message.author.id,
                         },
                         Reason: reason,
                         Time: message.createdAt
                     });

                     ban.save()
                         .then(result => console.log(result))
                         .catch(err => console.log(err));
                     toBan.ban(reason)
                         .catch(err => {
                             if (err) return message.channel.send(`Ban failed, Error: ${err}`)
                         });

                     logsChannel.send(embed);
                 } else if (emoji === "❌") {
                     msg.delete();

                     message.reply(`Ban canceled.`)
                         .then(m => m.delete(10000));

                       }
    });
  }
};
