const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const CD = require("../models/cd.js");
const Guild = require("../models/guild.js");
const Shop = require("../models/shop.js");
const User = require("../models/user.js");
const Warn = require("../models/warn.js");
const ms = require("ms")
const adWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]

module.exports = async (bot, message) => {
    let guild = await Guild.findOne({
      Guild: message.guild.id
    });
    if (!guild) {
      guild = new Guild({
        Guild: message.guild.id,
        AdminRole: "",
        ModeratorRole: "",
        Prefix: "sk!",
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
        LogsChannel: ""
      });
    }
    guild.save().catch(err => console.log(err));

    //Proverava da li je autor poruke bot ili je poruka poslata u dm botu i obustavlja operaciju.
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
    if (!message.member) message.member = message.guild.fetchMember(message.author);

    let shop = await Shop.findOne({ Guild: message.guild.id });
    if (!shop) {
      shop = new Shop({
        Guild: message.guild.id,
        Items: [],
      });
    }
    shop.save().catch(err => console.log(err));
    const chatMute = message.guild.roles.find(role => role.name === "Chat Muted") || message.guild.createRole({ name:"Chat Muted", color:"#27272b", permissions:[] });
    const voiceMute = message.guild.roles.find(role => role.name === "Voice Muted") || message.guild.createRole({ name:"Voice Muted", color:"#27272b", permissions:[] });
    //Filter za reklame
    if (adWords.some(word => message.content.toLowerCase().includes(word))) {
      let wUser = message.author;

      let warnembed = new RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setColor("#6b0808")
          .addField("Warned By", bot.user.username)
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
            Username: bot.user.username,
            ID: "586263579817279504",
          },
          Reason: "Advertisement",
          Time: message.createdAt

      });

      warn.save().catch(err => console.log(err));

          let warnings = await Warn.find({
              Guild: message.guild.id,
              WarnedUser: {
                Username: message.author.username,
                ID: message.author.id,
              },
          })
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
      let user = await User.findOne({
    		Guild: message.guild.id,
    		ID: message.author.id
    	});
    	let userObject = {
    		Guild: message.guild.id,
    		ID: message.author.id,
    		XP: 0,
    		Level: 1,
    		Cash: 0,
    		Bank: 1000,
    		Joined: message.author.joinedAt
    	}
    	if(!user) user = new User(userObject);

      //Ukoliko je poruka poslata u newbie-verify ne dodeljuje XP.
      if (message.channel.name === guild.VerifyChannel) return;
      if (message.member.roles.has(chatMute.id) || message.member.roles.has(voiceMute.id)) return;
      user.XP = user.XP + 20;
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

    let prefix = guild.Prefix;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = bot.commands.get(cmd);
    if (!message.content.startsWith(guild.Prefix)) return;

    if (!command) command = await bot.commands.get(bot.aliases.get(cmd));
      if (command) {
        const cd = await CD.findOne({ Guild: message.guild.id, CommandName: command.name, UsedBy: message.author.id });
        if (!cd || cd && Math.ceil((cd.Used + (cd.Cooldown * 1000) - Date.now())) <= 0) {
          if (cd) cd.deleteOne().catch(err => console.log(err));
          command.run(bot, message, args)
          const cooldown = new CD({
            Guild: message.guild.id,
            CommandName: command.name,
            Used: Date.now(),
            UsedBy: message.author.id,
            Cooldown: command.cooldown,
        })
        cooldown.save().catch(err => console.log(err));

        setTimeout(async () => {
          if (cd) cooldown.deleteOne().catch(err => console.log(err));
      }, command.cooldown * 1000);

    } else if (cd && Math.ceil((cd.Used + (cd.Cooldown * 1000) - Date.now())) >= 1) {
        return message.reply(`You need to wait **${Math.ceil((cd.Used + (cd.Cooldown * 1000) - Date.now()) / 1000)}** seconds before using this command again!`).then(message.delete(2000))
     }
  }
}
