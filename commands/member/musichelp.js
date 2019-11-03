const { RichEmbed } = require("discord.js");

module.exports = {
    name: "musichelp",
    aliases: [],
    category: "Member",
    description: "Shows help for music commands.",
    usage: "MusicHelp",
    run: async (bot, message, args) => {

        let musichelpembed = new RichEmbed()
            .setDescription("Music Help")
            .setColor("#00c3df")
            .addField("**.play [Song Name]**", "Search for a song and plays it after you have chosen one.")
            .addField("**.leave**", "Makes bot leave your channel.")
            .addField("**.skip**", "Skips a song and plays next in queue,if no song in queue bot will leave.")
            .addField("**.queue**", "Shows a queue of songs.");
            message.channel.send(musichelpembed);
  }
}
