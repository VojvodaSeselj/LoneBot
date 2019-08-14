const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

        let nsfwhelpembed = new Discord.RichEmbed()
            .setDescription("NSFW Help")
            .setColor("#000000")
            .addField("**.ass**", "Send ass image.")
            .addField("**.pussy**", "Send pussy image.")
            .addField("**.hentai**", "Send hentai image.")
            .addField("**.porn**", "Send porn gif.")
            .addField("**.4k**", "Send 4k porn image.")
            .addField("**.anal**", "Send anal image.")
            .addField("**.thigh**", "Send thigh image.");
            message.channel.send(nsfwhelpembed);

}
module.exports.help = {
    name: "nsfwhelp"
}
