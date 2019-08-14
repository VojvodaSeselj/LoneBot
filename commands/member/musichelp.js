const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

        let musichelpembed = new Discord.RichEmbed()
            .setDescription("Music Help")
            .setColor("#000000")
            .addField("**.play [Song Name]**", "Search for a song and plays it after you have chosen one.")
            .addField("**.leave**", "Makes bot leave your channel.")
            .addField("**.skip**", "Skips a song and plays next in queue,if no song in queue bot will leave.")
            .addField("**.queue**", "Shows a queue of songs.");
            message.channel.send(musichelpembed);

}
module.exports.help = {
    name: "musichelp"
}
