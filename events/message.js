const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const Guild = require("../models/guild.js");
const User = require("../models/user.js");
const Warn = require("../models/warn.js");
const adWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
const active = new Map();
let cooldown = new Set();
let cdseconds = 3;

module.exports = async (bot, message) => {
    //Proverava da li je autor poruke bot ili je poruka poslata u dm botu i obustavlja operaciju.
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;

    let guildid = message.guild.id;
    let guild = await Guild.findOne({
      Guild: guildid
    });
    if (!guild) {
      guild = new Guild({
        GuildName: message.guild.name,
        Guild: guildid,
        AdminRoles: [],
        ModeratorRoles: [],
        Prefix: ".",
        Nsfw: false,
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
        LogChannel: ""
      });
    }
    guild.save()
    const chatMute = message.guild.roles.find(role => role.name === "Chat Muted") || message.guild.createRole({ name:"Chat Muted", color:"#27272b", permissions:[] });
    const voiceMute = message.guild.roles.find(role => role.name === "Voice Muted") || message.guild.createRole({ name:"Voice Muted", color:"#27272b", permissions:[] });
    //Filter za reklame
    if (adWords.some(word => message.content.toLowerCase().includes(word))) {
      let wUser = message.author;

      let warnembed = new RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setColor("#6b0808")
          .addField("Warned By", "LoneBot")
          .addField("Original message", message)
          .addField("Reason", "Advertisement");

      let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
      if (!logschannel) return message.reply("Couldn't find reports channel.");


      message.delete();
      logschannel.send(warnembed);

      const warn = new Warn({
          Guild: message.guild.id,
          WarnedUser: {
            Username: message.author.username,
            ID: message.author.id,
          },
          WarnedBy: {
            Username: "LoneBot",
            ID: "586263579817279504",
          },
          Reason: "Advertisement",
          Time: message.createdAt

      });

      warn.save()
          .then(result => console.log(result))
          .catch(err => console.log(err));

          let guild = message.guild.id;
          let warnings = await Warn.find({
              Guild: guild,
              WarnedUser: {
                Username: message.author.username,
                ID: message.author.id,
              },
          })
          console.log(warnings);
          message.channel.send(`<@${message.author.id}> you have been warned for **Advertisement**,be careful because ${3 - warnings.length} more warnings will get you banned!`)

      if (warnings.length === 3) {
          message.guild.member(wUser).ban("Warned too many times");
          message.channel.send(`<@${message.author.id}> has been banned for getting warned third time!`)
          message.delete(0);
      }
    }
    //Proverava da li u kanalu newbie-verify neko pise bilo sta osim ${guild.Prefix}verify i ako da brise poruku
    if (message.channel.name === guild.VerifyChannel) {
      if (message.content !== `${guild.Prefix}verify`) return message.delete();
    }
    //Definisemo levle up nagrade
    let level5 = message.guild.roles.find(role => role.name === "Spammer [5]");
    let level10 = message.guild.roles.find(role => role.name === "Youngster [10]");
    let level20 = message.guild.roles.find(role => role.name === "Smartass [20]");
    let level30 = message.guild.roles.find(role => role.name === "O.G. [30]");
    let level40 = message.guild.roles.find(role => role.name === "Lonely [40]");
    let level50 = message.guild.roles.find(role => role.name === "Lonely AF [50]");

    //Proverava da li poruka pocinje sa prefixom i ako da ne dodeljuje mu XP.
  	if (!message.content.startsWith(guild.Prefix)) {
  		let author = message.author.id;
      let guild = message.guild.id;
      let user = await User.findOne({
        Guild: guild,
        ID: message.author.id
      });
      if (!user) {
        user = new User({
          Guild: guild,
          Username: message.author.username,
          ID: message.author.id,
          XP: 0,
          Level: 1,
          Cash: 0,
          Bank: 1000,
          Joined: message.author.joinedAt
        });
      }

      //Ukoliko je poruka poslata u newbie-verify ne dodeljuje XP.
      if (message.channel.name === guild.VerifyChannel) return;
      if (message.member.roles.has(chatMute.id) || message.member.roles.has(voiceMute.id)) return;
      let addXp = 20
      user.XP = user.XP + addXp;
      let untilNext = 5 * ((user.Level + 1) ** 2) + 50 * (user.Level + 1) + 100
      if (untilNext <= user.XP) {
        user.Level = user.Level + 1;
        user.XP = user.XP * 0
        let levelUp = new RichEmbed()
          .setFooter(message.author.tag, message.author.avatarURL)
          .setColor("#b84db6")
          .setDescription(stripIndents`Congratulations!
            **By sending messages in chat you reached next level!**
            **Your new level is** ${user.Level}
            **Current progress for next level is**
            **${user.XP}/${5 * ((user.Level + 1) ** 2) + 50 * (user.Level + 1) + 100}**`)
          .attachFiles(['./slike/xpgraph.png'])
          .setThumbnail('attachment://xpgraph.png')
        message.channel.send(levelUp)
      }
      if (user.Level === 5 && user.XP === 0) {
          await(message.member.addRole(level5.id));
          message.channel.send(`<@${message.author.id}> since you leveled up to level 5 you get role **Spammer**!`);
      }
      if (user.Level === 10 && user.XP === 0) {
          await(message.member.addRole(level10.id));
          message.channel.send(`<@${message.author.id}> since you leveled up to level 10 you get role **Youngster**!`);
      }
      if (user.Level === 20 && user.XP === 0) {
          await(message.member.addRole(level20.id));
          message.channel.send(`<@${message.author.id}> since you leveled up to level 20 you get role **Smartass**!`);
      }
      if (user.Level === 30 && user.XP === 0) {
          await(message.member.addRole(level30.id));
          message.channel.send(`<@${message.author.id}> since you leveled up to level 30 you get role **O.G.**!`);
      }
      if (user.Level === 40 && user.XP === 0) {
          await(message.member.addRole(level40.id));
          message.channel.send(`<@${message.author.id}> since you leveled up to level 40 you get role **Lonely**!`);
      }
      if (user.Level === 50 && user.XP === 0) {
          await(message.member.addRole(level50.id));
          message.channel.send(`<@${message.author.id}> since you leveled up to level 50 you get role **Lonely AF**!`);
      }
  		user.save().catch(err => console.log(err));
    }
    try {
      let ops = {
        active: active
      }
      if (!message.content.startsWith(guild.Prefix)) return;
      if (cooldown.has(message.author.id)){
        message.delete()
        return message.reply("You need to wait 3 seconds between using commands!").then(m => m.delete(3000));
      }
      cooldown.add(message.author.id)

      let prefix = guild.Prefix;
      let args = message.content.slice(prefix.length).trim().split(/ +/g);
      let cmd = args.shift().toLowerCase();
      if (cmd.length === 0) return;
      let command = bot.commands.get(cmd);
      if (!command) command = bot.commands.get(bot.aliases.get(cmd));
      if (command) command.run(bot, message, args);

      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, cdseconds * 1000)
    } catch (e) {
      console.log(e)
    }
  }
