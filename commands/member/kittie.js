const { RichEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: "kittie",
    aliases: [],
    category: "Member",
    description: "Shows random cat picture.",
    usage: "Kittie",
    run: async (bot, message, args) => {
    let {
        body
    } = await superagent
        .get(`https://aws.random.cat/meow`);

    let catembed = new RichEmbed()
        .setColor("#00c3df")
        .setTitle("Kittie  :cat:")
        .setImage(body.file);

    message.channel.send(catembed);
  }
}
