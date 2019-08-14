const Discord = require("discord.js");
const mongoose = require("mongoose");
let Xp = require("../../models/xp.js");

module.exports.run = async(bot, message, args) => {

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
        Xp: 0,
        Level: 0
      });
    }
    let curxp = xp.Xp;
		let curlvl = xp.Level;
    let nxtLvlXp = curlvl * 1000;
    let difference = nxtLvlXp - curxp;
    let uicon = message.author.displayAvatarURL;

    let lvlEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor("#b84db6")
        .setThumbnail(uicon)
        .addField("Level", curlvl, true)
        .addField("XP", curxp, true)
        .addField("XP til level up", difference, true)

    message.channel.send(lvlEmbed);

    xp.save()
        .catch(err => console.log(err));
}

module.exports.help = {
    name: "level"
}
