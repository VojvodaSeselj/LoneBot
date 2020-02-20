const { RichEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags")
const Guild = require("../../models/guild.js");

module.exports = {
    name: "help",
    aliases: [],
    category: "Member",
    description: "Shows help for commands.",
    usage: "Help [CommandName]",
    cooldown: 5,
    run: async (bot, message, args) => {
        let guildid = message.guild.id;
        let guild = await Guild.findOne({
          Guild: guildid
        });
        if (!args[0]) {
          let helpEmbed = new RichEmbed()
              .setColor("#00c3df")
              .setDescription(stripIndents`**List Of Commands**
              **BotInfo**
              Shows information about bot.

              **ServerInfo**
              Shows informations about server.

              **Avatar<User>**
              Shows avatar of user you want.

              **Doggo**
              Shows random image of dog.

              **Kittie**
              Shows random image of cat.

              **Level**
              Shows your level and xp.

              **Report<User> <reason>**
              Report somebody with reason.

              **GamesHelp**
              Give you a list of all games commands.

              **NSFWHelp**
              Give you a list of all nsfw commands.`);
              helpEmbed.setFooter("Syntax: <> = required, [] = optional");

              let membed = new RichEmbed()
                  .setColor("#00c3df")
                  .setDescription(stripIndents`**Moderator Commands**
                  **${guild.Prefix}warn <User> <Reason>** Warn user with a reason.
                  **${guild.Prefix}warnlevel <User>** Show how many warns user have.
                  **${guild.Prefix}userinfo <User>** Show informations about user.
                  **${guild.Prefix}setnick <User> <Nick>** Set a new nickname for user.
                  **${guild.Prefix}deafen <User> <Reason>** Deafen user with a reason.
                  **${guild.Prefix}undeafen <User>** Undeafen user.
                  **${guild.Prefix}mute <User> <Type> [Reason] [Time]** Mute a user.
                  **${guild.Prefix}clear <Number Of Lines>** Clear chat for specified number of lines.`)
                  membed.setFooter("Syntax: <> = required, [] = optional")

              let aembed = new RichEmbed()
                  .setColor("#00c3df")
                  .setFooter("Syntax: <> = required, [] = optional")
                  .setDescription(stripIndents`**Admin Commands**
                  **${guild.Prefix}ban <User> <Reason>** Ban user from server.
                  **${guild.Prefix}unban <User ID>** Unban user from server.
                  **${guild.Prefix}kick <User> <Reason>** Kick user from server.
                  **${guild.Prefix}givemoney <User> <Amount> <Type>** Give money to user.
                  **${guild.Prefix}removemoney <User> <Amount> <Type>** Remove money from user.
                  **${guild.Prefix}warn <User> <Reason>** Warn user with a reason.
                  **${guild.Prefix}warnlevel <User>** Show how many warns user have.
                  **${guild.Prefix}userinfo <User>** Show informations about user.
                  **${guild.Prefix}setnick <User> <Nick>** Set a new nickname for user.
                  **${guild.Prefix}deafen <User> <Reason>** Deafen user with a reason.
                  **${guild.Prefix}undeafen <User>** Undeafen user.
                  **${guild.Prefix}mute <User> <Type> [Reason] [Time]** Mute a user.
                  **${guild.Prefix}clear <Number Of Lines>** Clear chat for specified number of lines.`)
                  aembed.setFooter("Syntax: <> = required, [] = optional")

              let oembed = new RichEmbed()
                  .setColor("#00c3df")
                  .setFooter("Syntax: <> = required, [] = optional")
                  .setDescription(stripIndents`**Owner Commands**
                  **${guild.Prefix}setup** Configure bot for your server.
                  **${guild.Prefix}setupinfo** See bot's configuration for your server.
                  **${guild.Prefix}makeadmin <User>** Make user server admin.
                  **${guild.Prefix}makemoderator <User>** Make user server moderator.
                  **${guild.Prefix}addrole <User> <Role>** Add role to user.
                  **${guild.Prefix}removerole <User> <Role>** Removes role from user.
                  **${guild.Prefix}ban <User> <Reason>** Ban user from server.
                  **${guild.Prefix}unban <User ID>** Unban user from server.
                  **${guild.Prefix}kick <User> <Reason>** Kick user from server.
                  **${guild.Prefix}givemoney <User> <Amount> <Type>** Give money to user.
                  **${guild.Prefix}removemoney <User> <Amount> <Type>** Remove money from user.
                  **${guild.Prefix}warn <User> <Reason>** Warn user with a reason.
                  **${guild.Prefix}warnlevel <User>** Show how many warns user have.
                  **${guild.Prefix}userinfo <User>** Show informations about user.
                  **${guild.Prefix}setnick <User> <Nick>** Set a new nickname for user.
                  **${guild.Prefix}deafen <User> <Reason>** Deafen user with a reason.
                  **${guild.Prefix}undeafen <User>** Undeafen user.
                  **${guild.Prefix}mute <User> <Type> [Reason] [Time]** Mute a user.
                  **${guild.Prefix}clear <Number Of Lines>** Clear chat for specified number of lines.`)
                  oembed.setFooter("Syntax: <> = required, [] = optional")
            message.channel.send(helpEmbed)

            if (message.member.hasPermission("ADMINISTRATOR")) {
              try {
                  await message.author.send(oembed);
              } catch (e) {
                  message.reply("Your DMs are locked. I cannot send you Owner commands.");
                }
            } else if (message.member.roles.some(r => r.name === guild.AdminRole)) {
              try {
                  await message.author.send(aembed);
              } catch (e) {
                  message.reply("Your DMs are locked. I cannot send you Admin commands.");
                }
            } else if (message.member.roles.some(r=> r.name === guild.ModeratorRole)) {
              try {
                  await message.author.send(membed);
              } catch (e) {
                  message.reply("Your DMs are locked. I cannot send you Moderator commands.");
                }
            }
            } else {
            let command = args[0].toLowerCase();
            if (!bot.commands.has(command)) return;
            if (bot.commands.has(command) || bot.aliases.has(command)) {
            command = bot.commands.get(command) || bot.aliases.get(command);
            if (command.category === "Moderation" && !message.member.roles.some(r=>guild.ModeratorRole.concat(guild.AdminRole).includes(r.name)) && !message.member.hasPermission("ADMINISTRATOR")) return;
            let info = "";
            if (bot.aliases.has(args[0])) return;
            let helpCommandEmbed = new RichEmbed()
              .setColor("#00c3df")
              info += `**Command**: ${command.name}`
              if(command.aliases.length > 0) info += `\n**Aliases**: ${command.aliases.map(x => `\`\`${x}\`\``).join(", ")}`
              if(command.aliases.length === 0) info += `\n**Aliases**: None`
              if(command.description) info += `\n**Description**: ${command.description}`
              if(command.category) info += `\n**Category**: ${command.category}`
              if(command.usage) info += `\n**Usage**: ${command.usage}`
              if(command.example) info += `\n**Example**: ${command.example}`
              helpCommandEmbed.setDescription(info).setFooter("Syntax: <> = required, [] = optional");
            message.channel.send(helpCommandEmbed)
      }
    }
  }
}
