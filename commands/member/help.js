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

              **Avatar <user>**
              Shows avatar of user you want.

              **Doggo**
              Shows random image of dog.

              **Kittie**
              Shows random image of cat.

              **Level**
              Shows your level and xp.

              **Report <user> <reason>**
              Report somebody with reason.

              **GamesHelp**
              Give you a list of all games commands.

              **NSFWHelp**
              Give you a list of all nsfw commands.`);
              helpEmbed.setFooter("Syntax: <> = required, [] = optional");
            message.channel.send(helpEmbed)
            } else {
            let command = args[0].toLowerCase();
            if (!bot.commands.has(command)) return;
            if (bot.commands.has(command) || bot.aliases.has(command)) {
            command = bot.commands.get(command) || bot.aliases.get(command);
            if (command.category === "Moderation" && !message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒"].includes(r.name))) return;
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

        // let mod = message.guild.roles.find(role => role.name === "⚒ Moderator ⚒");
        // let modembed = new Discord.RichEmbed()
        //     .setDescription("Moderator Help")
        //     .setColor("#000000")
        //     .addField(`**${guild.Prefix}ban [user] [reason]**`, `Ban user with a reason.`)
        //     .addField(`**${guild.Prefix}unban [userID]**`, `Unban user,you need to provide ID`)
        //     .addField(`**${guild.Prefix}kick [user] [reason]**`, `Kick user with a reason.`)
        //     .addField(`**${guild.Prefix}warn [user] [reason]**`, `Warn user with a reason.`)
        //     .addField(`**${guild.Prefix}warnlevel [user]**`, `Show how many warns user have.`)
        //     .addField(`**${guild.Prefix}userinfo [user]**`, `Show informations about user.`)
        //     .addField(`**${guild.Prefix}setnick [user] [nick]**`, `Set a new nickname for user.`)
        //     .addField(`**${guild.Prefix}deafen [user] [reason]**`, `Deafen user with a reason.`)
        //     .addField(`**${guild.Prefix}undeafen [user]**`, `UnDeafen user.`)
        //     .addField(`**${guild.Prefix}cmute [user] [reason]**`, `Chat mute user with a reason.`)
        //     .addField(`**${guild.Prefix}ctempmute [user] [time] [reason]**`, `Temporarily chat mute user with a reason.`)
        //     .addField(`**${guild.Prefix}cunmute [user]**`, `Unmute user from chat.`)
        //     .addField(`**${guild.Prefix}vmute [user] [reason]**`, `Voice mute user with a reason.`)
        //     .addField(`**${guild.Prefix}vtempmute [user] [time] [reason]**`, `Temporarily voice mute user with a reason.`)
        //     .addField(`**${guild.Prefix}vunmute [user]**`, `Unmute user from voice.`)
        //     .addField(`**${guild.Prefix}clear [number]**`, `Clear chat for specified number of lines.`)
        //
        // if (message.member.roles.has(mod.id)) {
        //   try {
        //       await message.author.send(modembed);
        //   } catch (e) {
        //       message.reply("Your DMs are locked. I cannot send you the mod commands.");
        //     }
        // }
        //
        // let vcmod = message.guild.roles.find(role => role.name === "⚒ VC Moderator ⚒");
        // let vcembed = new Discord.RichEmbed()
        //     .setDescription("Voice Moderator Help")
        //     .setColor("#000000")
        //     .addField(`**${guild.Prefix}kick [user] [reason]**`, `Kick user with a reason.`)
        //     .addField(`**${guild.Prefix}warn [user] [reason]**`, `Warn user with a reason.`)
        //     .addField(`**${guild.Prefix}warnlevel [user]**`, `Show how many warns user have.`)
        //     .addField(`**${guild.Prefix}userinfo [user]**`, `Show informations about user.`)
        //     .addField(`**${guild.Prefix}deafen [user] [reason]**`, `Deafen user with a reason.`)
        //     .addField(`**${guild.Prefix}undeafen [user]**`, `UnDeafen user.`)
        //     .addField(`**${guild.Prefix}vmute [user] [reason]**`, `Voice mute user with a reason.`)
        //     .addField(`**${guild.Prefix}vtempmute [user] [time] [reason]**`, `Temporarily voice mute user with a reason.`)
        //     .addField(`**${guild.Prefix}vunmute [user]**`, `Unmute user from voice.`)
        //
        // if (message.member.roles.has(vcmod.id)) {
        //   try {
        //       await message.author.send(vcembed);
        //   } catch (e) {
        //       message.reply("Your DMs are locked. I cannot send you the mod commands.");
        //     }
        // }
        //
        // let cmod = message.guild.roles.find(role => role.name === "⚒ Chat Moderator ⚒");
        // let cembed = new Discord.RichEmbed()
        //     .setDescription("Chat Moderator Help")
        //     .setColor("#000000")
        //     .addField(`**${guild.Prefix}kick [user] [reason]**`, `Kick user with a reason.`)
        //     .addField(`**${guild.Prefix}warn [user] [reason]**`, `Warn user with a reason.`)
        //     .addField(`**${guild.Prefix}warnlevel [user]**`, `Show how many warns user have.`)
        //     .addField(`**${guild.Prefix}userinfo [user]**`, `Show informations about user.`)
        //     .addField(`**${guild.Prefix}cmute [user] [reason]**`, `Chat mute user with a reason.`)
        //     .addField(`**${guild.Prefix}ctempmute [user] [time] [reason]**`, `Temporarily chat mute user with a reason.`)
        //     .addField(`**${guild.Prefix}cunmute [user]**`, `Unmute user from chat.`)
        //     .addField(`**${guild.Prefix}clear [number]**`, `Clear chat for specified number of lines.`)
        //
        // if (message.member.roles.has(cmod.id)) {
        //   try {
        //       await message.author.send(cembed);
        //   } catch (e) {
        //       message.reply("Your DMs are locked. I cannot send you the mod commands.");
        //   }
      }
    }
  }
}
