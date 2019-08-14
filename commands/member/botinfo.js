const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
        .setDescription("Bot Info")
        .setColor("#1ec8ce")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Creation Date", bot.user.createdAt);

    return message.channel.send(botembed);
}

module.exports.help = {
    name: "botinfo"
}
