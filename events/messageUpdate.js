const { RichEmbed } = require("discord.js");
const fs = require("fs");
const adWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
const Warn = require("../models/warn.js");
const Guild = require("../models/guild.js");

module.exports = async (bot, oldMessage, newMessage) => {
  //Proverava da li je autor poruke bot ili je poruka poslata u dm botu i obustavlja operaciju.
  if (newMessage.channel.type === "dm") return;
  if (newMessage.author.bot) return;
  if (newMessage.content.startsWith("!")) return
  if (newMessage.content.startsWith("?")) return

  let guild = await Guild.findOne({
    Guild: oldMessage.guild.id
  });
  if (!guild) {
    guild = new Guild({
      Guild: oldMessage.guild.id,
      AdminRole: "",
      ModeratorRole: "",
      Prefix: "sk!",
      Nsfw: false,
      Xp: true,
      Verify: {
        Enabled: false,
        VerifyRole: "",
        VerifiedRole: "",
        Channel: "",
        LogsChannel: "",
      },
      Welcome: {
        Enabled: false,
        Channel: "",
        Message: "",
      },
      Leave: {
        Enabled: false,
        Channel: "",
        Message: "",
      },
      AutoRoles: {
        Enabled: false,
        Roles: [],
      },
      LogsChannel: ""
    });
  }
  guild.save().catch(err => console.log(err));

  //Filter za reklame
  if (adWords.some(word => newMessage.content.toLowerCase().includes(word))) {

    let warnembed = new RichEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
        .setColor("#6b0808")
        .addField("Warned By", bot.user.username)
        .addField("Edited message", newMessage)
        .addField("Reason", "Advertisement");

    let logschannel = oldMessage.guild.channels.find(channel => channel.name === guild.LogsChannel);
    if (!logschannel) return oldMessage.reply("Couldn't find reports channel.");


    newMessage.delete().catch(O_o => {});
    logschannel.send(warnembed);

    let warnings = await Warn.find({
      Guild: newMessage.guild.id,
      WarnedUser: {
        ID: newMessage.author.id,
      },
    })

    const warn = new Warn({
        Guild: newMessage.guild.id,
        ID: warnings.length + 1,
        WarnedUser: {
          ID: newMessage.author.id,
        },
        WarnedBy: {
          Username: bot.user.tag,
          ID: bot.user.id,
        },
        Reason: "Advertisement",
        Time: newMessage.createdAt
    });

    warn.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));


    if (warn.ID < 3) {
      oldMessage.channel.send(`<@${newMessage.author.id}> you have been warned for **Advertisement**,be careful because ${3 - warn.ID} more warnings will get you banned!`);
    }
    if (warn.ID >= 3) {
        if (!oldMessage.guild.me.hasPermission("BAN_MEMBERS")) {
          return oldMessage.reply("I do not have permission to ban members for being warned 3 times.").then(m => m.delete(5000));
        } else if (oldMessage.guild.me.hasPermission("BAN_MEMBERS")) {
        oldMessage.guild.member(oldMessage.author.id).ban("Warned too many times");
        oldMessage.channel.send(`<@${oldMessage.author.id}> has been banned for getting warned third time!`)
      }
    }
    }
  }
