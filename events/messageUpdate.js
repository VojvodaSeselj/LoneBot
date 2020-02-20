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
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
        .setColor("#6b0808")
        .addField("Warned By", bot.user.tag)
        .addField("Reason", "Advertisement");

    let logschannel = oldMessage.guild.channels.find(channel => channel.name === guild.LogsChannel);
    if (!logschannel) return oldMessage.reply("Couldn't find reports channel.");


    newMessage.delete().catch(O_o => {});
    logschannel.send(warnembed);

    const warn = new Warn({
        Guild: newMessage.guild.id,
        WarnedUsername: newMessage.author.username,
        WarnedUserID: newMessage.author.id,
        WarnedBy: bot.user.tag,
        WarnedByID: "586263579817279504",
        Reason: "Advertisement",
        Time: newMessage.createdAt

    });

    warn.save().catch(err => console.log(err));

        let guild = oldMessage.guild.id;
        let warnings = await Warn.find({
            Guild: guild,
            WarnedUserID: wUser.id
        })
        oldMessage.channel.send(`<@${wUser.id}> you have been warned for **Advertisement**,be careful because ${3 - warnings.length} more warnings will get you banned!`)

    if (warnings.length === 3) {
        oldMessage.guild.member(wUser).ban("Warned too many times");
        oldMessage.channel.send(`<@${wUser.id}> has been banned for getting warned third time!`)
        }
    }
  }
