const { RichEmbed } = require("discord.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "setupinfo",
    aliases: [],
    category: "Owner",
    description: "Show how bot is configured for your server.",
    usage: "SetupInfo",
    cooldown: 5,
    run: async (bot, message, args) => {
  let guildid = message.guild.id;
  let guild = await Guild.findOne({
    Guild: guildid
  });
  if (message.deletable) message.delete()

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
  }

  let info = "";
  let embed = new RichEmbed()
      .setThumbnail(message.guild.iconURL)
      .setColor("#0785ed")
      info += `**Server Setup**`
      if(guild.LogsChannel) info += `\n**Logs Channel**:\n${guild.LogsChannel}\n`
      if(guild.LogsChannel.length === 0) info += `\n**Logs Channel**:\nNot Set Up\n`
      if(guild.Prefix) info += `\n**Prefix**:\n${guild.Prefix}\n`
      if(guild.Prefix.length === 0) info += `\n**Prefix**:\nNot Set Up\n`
      if(guild.AdminRole) info += `\n**Admin Role**:\n${guild.AdminRole}\n`
      if(guild.AdminRole.length === 0) info += `\n**Admin Role**:\nNot Set Up\n`
      if(guild.ModeratorRole) info += `\n**Moderator Role**:\n${guild.ModeratorRole}\n`
      if(guild.ModeratorRole.length === 0) info += `\n**Moderator Role**:\nNot Set Up\n`
      if(guild.Welcome) info += `\n**Welcome**:\n${guild.Welcome.Enabled}\n`
      if(guild.Welcome.Channel) info += `\n**Welcome Channel**:\n${guild.Welcome.Channel}\n`
      if(guild.Welcome.Channel.length === 0) info += `\n**Welcome Channel**:\nNot Set Up\n`
      if(guild.Welcome.Message) info += `\n**Welcome Message**:\n${guild.Welcome.Message}\n`
      if(guild.Welcome.Message.length === 0) info += `\n**Welcome Message**:\nNot Set Up\n`
      if(guild.Leave) info += `\n**Leave**:\n${guild.Leave.Enabled}\n`
      if(guild.Leave.Channel) info += `\n**Leave Channel**:\n${guild.Leave.Channel}\n`
      if(guild.Leave.Channel.length === 0) info += `\n**Leave Channel**:\nNot Set Up\n`
      if(guild.Leave.Message) info += `\n**Leave Message**:\n${guild.Leave.Message}\n`
      if(guild.Leave.Message.length === 0) info += `\n**Leave Message**:\nNot Set Up\n`
      if(guild.Verify) info += `\n**Verify**:\n${guild.Verify.Enabled}\n`
      if(guild.Verify.Channel) info += `\n**Verify Channel**:\n${guild.Verify.Channel}\n`
      if(guild.Verify.Channel.length === 0) info += `\n**Verify Channel**:\nNot Set Up\n`
      if(guild.Verify.LogsChannel) info += `\n**Verify Logs Channel**:\n${guild.Verify.LogsChannel}\n`
      if(guild.Verify.LogsChannel.length === 0) info += `\n**Verify Logs Channel**:\nNot Set Up\n`
      if(guild.Verify.VerifyRole) info += `\n**Verify Role**:\n${guild.Verify.VerifyRole}\n`
      if(guild.Verify.VerifyRole.length === 0) info += `\n**Verify Role**:\nNot Set Up\n`
      if(guild.Verify.VerifiedRole) info += `\n**Verified Role**:\n${guild.Verify.VerifiedRole}\n`
      if(guild.Verify.VerifiedRole.length === 0) info += `\n**Verified Role**:\nNot Set Up\n`
      if(guild) info += `\n**NSFW**:\n${guild.Nsfw}\n`
      if(guild.Nsfw.length === 0) info += `\n**NSFW**:\nNot Set Up`
      info = info
      .replace(/true/g, "Enabled")
      .replace(/false/g, "Disabled");
      embed.setDescription(info);

  message.channel.send(embed);
  }
}

// **AutoRoles**
// To setup roles new members get upon joining or after verifying.
// To enable/disable it just write ${guild.Prefix}setup autoroles enable/disable!
//
// **StaffRoles**
// To setup staff roles,they will be able to use all commands from moderation category!
