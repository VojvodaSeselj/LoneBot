const { RichEmbed } = require("discord.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "setupinfo",
    aliases: [],
    category: "BotConfig",
    description: "Show how bot is configured for your server.",
    usage: "SetupInfo",
    run: async (bot, message, args) => {
  let guildid = message.guild.id;
  let guild = await Guild.findOne({
    Guild: guildid
  });
  let verifyembed = new RichEmbed()
      .setThumbnail(message.guild.iconURL)
      .setColor("#0785ed")
      .setDescription("**Setup Info**")
      .addField("**LogsChannel**", `${guild.LogsChannel}` || "Not set up")
      .addField("**Prefix**", `${guild.Prefix}` || "Not set up")
      .addField("**Welcome**", `${guild.Welcome.Enabled}` || "Not set up")
      .addField("**Welcome Channel**", `${guild.Welcome.Channel}` || "Not set up")
      .addField("**Welcome Message**", `${guild.Welcome.Message}` || "Not set up")
      .addField("**Leave**", `${guild.Leave.Enabled}` || "Not set up")
      .addField("**Leave Channel**", `${guild.Leave.Channel}` || "Not set up")
      .addField("**Leave Message**", `${guild.Leave.Message}` || "Not set up")
      .addField("**Verify**", `${guild.Verify.Enabled}` || "Not set up")
      .addField("**Verify Channel**", `${guild.Verify.Channel}` || "Not set up")
      .addField("**Verify Logs Channel**", `${guild.Verify.LogsChannel}` || "Not set up")
      .addField("**Verify Role**", `${guild.Verify.VerifyRole}` || "Not set up")
      .addField("**Verified Role**", `${guild.Verify.VerifiedRole}` || "Not set up")
      .addField("**NSFW**", `${guild.Nsfw}` || "Not set up")

  message.channel.send(verifyembed);
  }
}

// **AutoRoles**
// To setup roles new members get upon joining or after verifying.
// To enable/disable it just write ${guild.Prefix}setup autoroles enable/disable!
//
// **StaffRoles**
// To setup staff roles,they will be able to use all commands from moderation category!
