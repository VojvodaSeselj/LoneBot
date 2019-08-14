const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTitle('Server Info')
    .setThumbnail(message.guild.iconURL)
    .addField('Name', message.guild.name, true)
    .addField('ID', message.guild.id, true)
    .addField('Creation Date', message.guild.createdAt.toDateString(), true)
    .addField('Owner', message.guild.owner.user.tag, true)
    .addField('Members', message.guild.memberCount, true)

    return message.channel.send(serverembed)
}

module.exports.help = {
    name: "serverinfo"
}
