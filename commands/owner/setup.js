const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const Guild = require("../../models/guild.js")

module.exports = {
    name: "setup",
    aliases: [],
    category: "Owner",
    description: "Set up bot for your discord server.",
    usage: "SetUp",
    example: "SetUp logschannel moderation-logs",
    cooldown: 5,
    run: async (bot, message, args) => {
      let guildid = message.guild.id;
      let guild = await Guild.findOne({ Guild: guildid })
      if (message.deletable) message.delete()

      if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
      }

      const setupEmbed = new RichEmbed()
          .setColor("#ff8c00")
          .setThumbnail(message.member.tag, message.member.displayAvatarURL)
          .setFooter(message.member.displayName, message.author.displayAvatarURL)
          .setDescription(stripIndents`**Setup**
          **LogsChannel**
          To setup logs channel.

          **Prefix**
          To setup prefix.

          **Welcome**
          To enable/disable welcome message and channel.

          **WelcomeChannel**
          To setup welcome channel where new members will be welcomed.

          **WelcomeMessage**
          To setup welcome message which will be sent to new members in welcome channel.
          You can use these placeholders:
          {memberCount} - Number of members on your server.
          {botCount} - Number of bots on your server.
          {serverName} - Server name.
          {userName} - Member's username.
          {userMention} - Mention member.
          {userTag} - Member's tag.

          **Leave**
          To enable/disable leave message and channel.

          **LeaveChannel**
          To setup leave channel where members that left will get final goodbye.

          **LeaveMessage**
          To setup leave message which will be sent in leave channel.
          You can use these placeholders:
          {memberCount} - Number of members on your server.
          {serverName} - Server name.
          {userTag} - Member's tag.

          **AutoRoles**
          To setup roles new members get upon joining or after verifying.
          To enable/disable it just write ${guild.Prefix}setup autoroles enable/disable!

          **AdminRole**
          To setup admin roles,they will be able to use all commands from moderation and admin category!

          **ModeratorRole**
          To setup moderator roles,they will be able to use all commands from moderation category!

          **Verify**
          To enable/disable verify commands.

          **VerifyChannel**
          To setup verify channel in which new members will have to verify.

          **VerifyLogsChannel**
          To setup verify logs channel in which you will see who verified.

          **VerifyRole**
          To setup role new members get before verifying.

          **VerifiedRole**
          To setup role members get after verifying.

          **NSFW**
          To enable/disable nsfw commands.`);

  		const toSetup = args[0];
      if(!["logschannel", "prefix", "welcome", "welcomechannel", "welcomemessage", "leave", "leavechannel", "leavemessage", "autoroles", "adminrole", "moderatorrole", "verify", "verifychannel", "verifylogschannel", "verifyrole", "verifiedrole", "nsfw"].includes(args[0])) return message.channel.send(setupEmbed);

  		if(toSetup === "logschannel") {
        if (!args[1]) return message.reply("You need to provide channel name!Caps sensitive!");
        if (args[1] === guild.LogsChannel) return message.reply(`You already made ${args[1]} as your logs channel!`);
        let channel = message.guild.channels.find(channel => channel.name === args[1]);
        if (!channel) return message.reply("That channel does not exist or you misspelled the name!")
        guild.LogsChannel = channel.name
        guild.save()
        message.reply(`You made ${channel} as your logs channel!`);
    }
    else if(toSetup === "prefix") {
        if (!args[1]) return message.reply("You need to provide prefix you want for your server!");
        if (args[1] === guild.Prefix) return message.reply(`You already made ${args[1]} as prefix for your server!`);
        guild.Prefix = args[1]
        guild.save()
        message.reply(`You made ${args[1]} as prefix for your server!`);
    }
    else if(toSetup === "welcome") {
        if (!args[1]) return message.reply("You need to include enable(To enable it) or disable(To disable it)!");
        if (args[1] !== "enable" && args[1] !== "disable") return message.reply("You can only use enable and disable!Caps sensitive!");
        let option = args[1];
        option = option
        .replace(/enable/g, true)
        .replace(/disable/g, false);
        if (args[1] === "enable" && guild.Welcome.Enabled === true) {
          return message.reply(`You already ${args[1]}d welcome channel and message!`);
        }
        else if (args[1] === "disable" && guild.Welcome.Enabled === false) {
          return message.reply(`You already ${args[1]}d welcome channel and message!`);
        }
        message.reply(`You ${args[1]}d welcome channel and message!`);
        guild.Welcome.Enabled = option
        guild.save();
    }
    else if(toSetup === "welcomechannel") {
        if (!args[1]) return message.reply("You need to provide welcome channel name!Caps sensitive!");
        if (args[1] === guild.Welcome.Channel) return message.reply(`You already made ${args[1]} as your welcome channel!`);
        let channel = message.guild.channels.find(channel => channel.name === args[1]);
        if (!channel) return message.reply("That channel does not exist or you misspelled the name!");
        guild.Welcome.Channel = channel.name
        guild.save()
        message.reply(`You made ${channel} as your welcome channel!`);
    }
    else if(toSetup === "welcomemessage") {
        if (!args[1]) return message.reply("You need to provide welcome message!");
        if (args.slice(1).join(` `) === guild.Welcome.Message) return message.reply(`You already made "${args.slice(1).join(` `)}" as your welcome message!`);
        guild.Welcome.Message = args.slice(1).join(` `)
        guild.save()
        message.reply(`You made ${args.slice(1).join(` `)} as your welcome message!`);
    }
    else if(toSetup === "leave") {
        if (!args[1]) return message.reply("You need to include enable(To enable it) or disable(To disable it)!");
        if (args[1] !== "enable" && args[1] !== "disable") return message.reply("You can only use enable and disable!Caps sensitive!");
        let option = args[1];
        option = option
        .replace(/enable/g, "true")
        .replace(/disable/g, "false");
        if (args[1] === "enable" && guild.Leave.Enabled === true) {
          return message.reply(`You already ${args[1]}d leave channel and message!`);
        }
        else if (args[1] === "disable" && guild.Leave.Enabled === false) {
          return message.reply(`You already ${args[1]}d leave channel and message!`);
        }
        message.reply(`You ${args[1]}d leave channel and message!`);
        guild.Leave.Enabled = option
        guild.save();
      }
      else if(toSetup === "leavechannel") {
          if (!args[1]) return message.reply("You need to provide leave channel name!Caps sensitive!");
          if (args[1] === guild.Leave.Channel) return message.reply(`You already made ${args[1]} as your leave channel!`);
          let channel = message.guild.channels.find(channel => channel.name === args[1]);
          if (!channel) return message.reply("That channel does not exist or you misspelled the name!");
          guild.Leave.Channel = channel.name
          guild.save()
          message.reply(`You made ${channel} as your leave channel!`);
      }
      else if(toSetup === "leavemessage") {
          if (!args[1]) return message.reply("You need to provide leave message!");
          if (args.slice(1).join(` `) === guild.Leave.Message) return message.reply(`You already made "${args.slice(1).join(` `)}" as your leave message!`);
          guild.Leave.Message = args.slice(1).join(` `)
          guild.save()
          message.reply(`You made ${args.slice(1).join(` `)} as your leave message!`);
      }
      else if(toSetup === "autoroles") {
          if (!args[1]) return message.reply("Do you want to Remove or Add one?");
          if (!args[2]) return message.reply("You need to mention the role or provide the role id/name");
          const role = message.guild.roles.find(role => role.name === args.slice(2).join(" "));
          if (!role) return message.reply("Couldn't find that role!");
          if (args[1].toLowerCase() === "remove") {
            if (!guild.AutoRoles.Roles.includes(role.id)) return message.reply("That role isn't set up as an Auto Role!");
            guild.AutoRoles.Roles.splice(guild.AutoRoles.Roles.findIndex((x) => x === role.id), 1);
            guild.save().catch(console.error);
            message.reply("Successfully removed the role " + role.name + "!");
         }
          if(args[1].toLowerCase() === "add") {
            if(guild.AutoRoles.Roles.includes(role.id)) return message.reply("That role is already added as a Auto Role!");
            guild.AutoRoles.Roles = [...guild.AutoRoles.Roles, role.id];
            guild.save().catch(console.error);
            message.reply("Successfully added the role " + role.name + "!");
         }
        }
        else if(toSetup === "adminrole") {
         if (!args[1]) return message.reply("You need to supply name of the role you want to make admin role!");
         let adminrole = message.guild.roles.find(role => role.name === args.slice(1).join(" "));
         if (!adminrole) return message.reply("That role does not exist or you misspelled the name!")
         if (adminrole.name === guild.AdminRole) return message.channel.send(`<@${message.author.id}>, You already set this role as admin role!`);
         guild.AdminRole = adminrole.name;
         message.channel.send(`<@${message.author.id}>, You set admin role to ${adminrole}.`);
         guild.save().catch(console.error);
       }
        else if(toSetup === "moderatorrole") {
         if (!args[1]) return message.reply("You need to supply name of the role you want to make moderator role!");
         let modrole = message.guild.roles.find(role => role.name === args.slice(1).join(" "));
         if (!modrole) return message.reply("That role does not exist or you misspelled the name!")
         if (modrole.name === guild.ModeratorRole) return message.channel.send(`<@${message.author.id}>, You already set this role as moderator role!`);
         guild.ModeratorRole = modrole.name;
         message.channel.send(`<@${message.author.id}>, You set moderator role to ${modrole}.`);
         guild.save().catch(console.error);
       }
      else if(toSetup === "verify") {
          if (!args[1]) return message.reply("You need to include enable(To enable it) or disable(To disable it)!");
          if (args[1] !== "enable" && args[1] !== "disable") return message.reply("You can only use enable and disable!Caps sensitive!");
          let option = args[1];
          option = option
          .replace(/enable/g, "true")
          .replace(/disable/g, "false");
          if (args[1] === "enable" && guild.Verify.Enabled === true) {
            return message.reply(`You already ${args[1]}d verification!`);
          }
          else if (args[1] === "disable" && guild.Verify.Enabled === false) {
            return message.reply(`You already ${args[1]}d verification!`);
          }
          message.reply(`You ${args[1]}d verification for new members upon joining!`);
          guild.Verify.Enabled = option
          guild.save();
      }
      else if(toSetup === "verifychannel") {
          if (!args[1]) return message.reply("You need to provide welcome channel name!Caps sensitive!");
          if (args[1] === guild.Verify.Channel) return message.reply(`You already made ${args[1]} as your verify channel!`);
          let channel = message.guild.channels.find(channel => channel.name === args[1]);
          if (!channel) return message.reply("That channel does not exist or you misspelled the name!");
          guild.Verify.Channel = channel.name
          guild.save()
          message.reply(`You made ${channel} as your verify channel!`);
      }
      else if(toSetup === "verifylogschannel") {
        if (!args[1]) return message.reply("You need to provide channel name!Caps sensitive!");
        if (args[1] === guild.Verify.LogsChannel) return message.reply(`You already made ${args[1]} as your verify logs channel!`);
        let channel = message.guild.channels.find(channel => channel.name === args[1]);
        if (!channel) return message.reply("That channel does not exist or you misspelled the name!")
        guild.Verify.LogsChannel = channel.name
        guild.save()
        message.reply(`You made ${channel} as your verify logs channel!`);
    }
    else if(toSetup === "verifyrole") {
      let verifyrole = args.slice(1).join(" ")
      if (!verifyrole) return message.reply("You need to supply a role name! (Caps Sensitive)");
      let toverify = message.guild.roles.find(role => role.name === verifyrole);
      if (!toverify) return message.reply("That role does not exist or you misspelled the name!")
      if (verifyrole === guild.Verify.VerifyRole) return message.channel.send(`<@${message.author.id}>, You already set this role as verify role!`);
      guild.Verify.VerifyRole = toverify.name;
      message.channel.send(`<@${message.author.id}>, You set verify role to ${toverify}.`);
      guild.save();
    }
    else if(toSetup === "verifiedrole") {
      let verifyrole = args.slice(1).join(" ")
      if (!verifyrole) return message.reply("You need to supply a role name! (Caps Sensitive)");
      let toverify = message.guild.roles.find(role => role.name === verifyrole);
      if (!toverify) return message.reply("That role does not exist or you misspelled the name!")
      if (verifyrole === guild.Verify.VerifyRole) return message.channel.send(`<@${message.author.id}>, You already set this role as verified role!`);
      guild.Verify.VerifiedRole = toverify.name;
      message.channel.send(`<@${message.author.id}>, You set verified role to ${toverify}.`);
      guild.save();
    }
    else if(toSetup === "nsfw") {
        if (!args[1]) return message.reply("You need to include enable(To enable it) or disable(To disable it)!");
        if (args[1] !== "enable" && args[1] !== "disable") return message.reply("You can only use enable and disable!Caps sensitive!");
        let option = args[1];
        option = option
        .replace(/enable/g, true)
        .replace(/disable/g, false);
        if (args[1] === "enable" && guild.Nsfw === true) {
          return message.reply(`You already ${args[1]}d NSFW commands!`);
        }
        else if (args[1] === "disable" && guild.Nsfw === false) {
          return message.reply(`You already ${args[1]}d NSFW commands!`);
        }
        message.reply(`You ${args[1]}d NSFW commands!`);
        guild.Nsfw = option
        guild.save();
    }
	}
}
