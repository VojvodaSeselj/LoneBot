const { RichEmbed } = require("discord.js");
const fs = require("fs");
const adWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
const Warn = require("../models/warn.js");

module.exports = async (bot, oldMessage, newMessage) => {
  //Proverava da li je autor poruke bot ili je poruka poslata u dm botu i obustavlja operaciju.
  if (newMessage.channel.type === "dm") return;
  if (newMessage.author.bot) return;
  if (newMessage.content.startsWith("!")) return
  if (newMessage.content.startsWith("?")) return

  //Filter za reklame
  if (adWords.some(word => newMessage.content.toLowerCase().includes(word))) {
    let wUser = newMessage.author;

    let warnembed = new RichEmbed()
        .setAuthor(newMessage.author.tag, newMessage.author.avatarURL)
        .setColor("#6b0808")
        .addField("Warned By", bot.user.username)
        .addField("Original message", newMessage)
        .addField("Reason", "Advertisement");

    let logschannel = newMessage.channels.find(channel => channel.name === guild.LogsChannel);
    if (!logschannel) return newMessage.reply("Couldn't find reports channel.");


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
      newMessage.channel.send(`<@${newMessage.author.id}> you have been warned for **Advertisement**,be careful because ${3 - warn.ID} more warnings will get you banned!`);
    }
    if (warn.ID >= 3) {
        if (!newMessage.guild.me.hasPermission("BAN_MEMBERS")) {
          return newMessage.reply("I do not have permission to ban members for being warned 3 times.").then(m => m.delete(5000));
        } else if (newMessage.guild.me.hasPermission("BAN_MEMBERS")) {
        newMessage.guild.member(newMessage.author.id).ban("Warned too many times");
        newMessage.channel.send(`<@${newMessage.author.id}> has been banned for getting warned third time!`)
      }
    }
    }
  }
