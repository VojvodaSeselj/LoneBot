const { RichEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: "doggo",
    aliases: [],
    category: "Member",
    description: "Shows random dog picture.",
    usage: "Doggo",
    example: "Doggo",
    cooldown: 5,
    run: async (bot, message, args) => {
    let {
        body
    } = await superagent
        .get(`https://random.dog/woof.json`);

    let dogembed = new RichEmbed()
        .setColor("#00c3df")
        .setTitle("Doggo :dog:")
        .setImage(body.url);

    message.channel.send(dogembed);
  }
}
