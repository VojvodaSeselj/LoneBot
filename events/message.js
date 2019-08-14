const Discord = require("discord.js");
// const profanities = require(`profanities`); // Anti Profanities
const botconfig = require("../botconfig.json");
const fs = require("fs");
let Xp = require("../models/xp.js");
const adWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
const Warn = require("../models/warn.js");
const active = new Map();

module.exports.run = async (bot, message) => {
    //Proverava da li je autor poruke bot ili je poruka poslata u dm botu i obustavlja operaciju.
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (message.content.startsWith("!")) return
    if (message.content.startsWith("?")) return

    //Filter za reklame
    if (adWords.some(word => message.content.toLowerCase().includes(word))) {
      let wUser = message.author;

      let warnembed = new Discord.RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setColor("#6b0808")
          .addField("Warned By", "LoneBot")
          .addField("Reason", "Advertisement");

      let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
      if (!logschannel) return message.reply("Couldn't find reports channel.");


      message.delete().catch(O_o => {});
      logschannel.send(warnembed);

      const warn = new Warn({
          Guild: message.guild.id,
          WarnedUsername: message.author.username,
          WarnedUserID: message.author.id,
          WarnedBy: "LoneBot",
          WarnedByID: "586263579817279504",
          Reason: "Advertisement",
          Time: message.createdAt

      });
      warn.save()
          .then(result => console.log(result))
          .catch(err => console.log(err));

          let guild = message.guild.id;
          let warnings = await Warn.find({
              Guild: guild,
              WarnedUserID: wUser.id
          })
          console.log(warnings);
          message.channel.send(`<@${wUser.id}> you have been warned for **Advertisement**,be careful because ${3 - warnings.length} more warnings will get you banned!`)

      if (warnings.length === 3) {
          message.guild.member(wUser).ban("Warned too many times");
          message.channel.send(`<@${wUser.id}> has been banned for getting warned third time!`)
          message.delete(0);
      }
    }
    // Filter za psovke
    // for (x = 0; x < profanities.length; x++) {
    //   if(message.content.toUpperCase() == profanities[x].toUpperCase()) {
    //     message.channel.send(`Bad words are bannable be careful!`)
    //     message.delete();
    //     return;
    //   }
    // }
    bot.emit('checkMessage', message);
    //Proverava da li u kanalu newbie-verify neko pise bilo sta osim .verify i ako da brise poruku.
    if (message.channel.name === "newbie-verify") {
      if (message.content !== `${botconfig.prefix}verify`) return message.delete();
    }
    //Definisemo levle up nagrade
    if (message.guild.id === "585827148212862978") {
    let level5 = message.guild.roles.find(role => role.name === "Spammer [5]");
    let level10 = message.guild.roles.find(role => role.name === "Youngster [10]");
    let level20 = message.guild.roles.find(role => role.name === "Smartass [20]");
    let level30 = message.guild.roles.find(role => role.name === "O.G. [30]");
    let level40 = message.guild.roles.find(role => role.name === "Lonely [40]");
    let level50 = message.guild.roles.find(role => role.name === "Lonely AF [50]");
    // git clone https://gitlab.com/Xladen18/lone-bot.gitProverava da li user vec ima coin i ako ne dodeljuje defaulth value.
    // let author = message.author.id;
    // let guild = message.guild.id;
    // let coins = await Coins.findOne({
    //   Guild: guild,
    //   ID: author
    // });
    // if (!coins) {
    //   coins = new Coins({
    //     Name: message.author.username,
    //     ID: author,
    //     Guild: guild,
    //     Coins: 0,
    //   });
    // }
    //Proverava da li poruka pocinje sa prefixom i ako da ne dodeljuje mu XP.
  	if (!message.content.startsWith(botconfig.prefix)) {
  		let author = message.author.id;
      let guild = message.guild.id;
  		let xp = await Xp.findOne({
        Guild: guild,
  			ID: author
  		});
  		if (!xp) {
  			xp = new Xp({
          Name: message.author.username,
          Guild: guild,
  				ID: author,
  				Xp: 0,
  				Level: 1
  			});
      }
      //Ukoliko je poruka poslata u newbie-verify ne dodeljuje XP.
      if (message.channel.name === "newbie-verify") return;
      //XP System
  		let xpAdd = Math.floor(Math.random() * 5) + 8;
  		let curxp = xp.Xp;
  		let curlvl = xp.Level;
  		let nxtLvl = xp.Level * 1000; //Ovo promeniti sto veci level to vise xp-a potrebno u buducnosti.
      let uicon = message.author.displayAvatarURL;
  		xp.Xp = curxp + xpAdd;
  		if (nxtLvl <= xp.Xp) {
        xp.Level = curlvl + 1;
  			let lvlup = new Discord.RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setColor("#ff00c3")
          .setThumbnail(uicon)
          .addField("Congratulations you leveled up!", (message.author.username))
          .addField("Your new level is", (xp.Level))
          .addField("For next level you need", (nxtLvl + 1000 - curxp - xpAdd) + " more XP");
          message.channel.send(lvlup);
          //Proverava level membera i dodeljuje mu role ako je odredjeni level.
      if (xp.Level === 5) {
          await(message.member.addRole(level5.id));
          message.channel.send(`<@${message.author.id}> since you leveled up to level 5 you get role **Spammer**!`);
      }
      if (xp.Level === 10) {
          await(message.member.addRole(level10.id));
          message.channel.send(`<@${message.author.id}> since you leveled up to level 10 you get role **Youngster**!`);
      }
      if (xp.Level === 20) {
          await(message.member.addRole(level20.id));
          message.channel.send(`<@${message.author.id}> since you leveled up to level 20 you get role **Smartass**!`);
      }
      if (xp.Level === 30) {
          await(message.member.addRole(level30.id));
          message.channel.send(`<@${message.author.id}> since you leveled up to level 30 you get role **O.G.**!`);
      }
      if (xp.Level === 40) {
          await(message.member.addRole(level40.id));
          message.channel.send(`<@${message.author.id}> since you leveled up to level 40 you get role **Lonely**!`);
      }
      if (xp.Level === 50) {
          await(message.member.addRole(level50.id));
          message.channel.send(`<@${message.author.id}> since you leveled up to level 50 you get role **Lonely AF**!`);
        }
  		}
  		xp.save().then((result) => console.log(result)).catch((err) => console.log(err));
  	  }
    }
    try {
      let ops = {
        active: active
      }
      let prefix = botconfig.prefix;
    	let messageArray = message.content.split(" ");
    	let cmd = messageArray[0];
    	let args = messageArray.slice(1);
    	let commandfile = bot.commands.get(cmd.slice(prefix.length));
      if(!message.content.startsWith(prefix)) return
    	if (commandfile) commandfile.run(bot, message, args, ops);
    } catch (e) {
      console.log(e)
    }
}

module.exports.help = {
    name: "message"
}
