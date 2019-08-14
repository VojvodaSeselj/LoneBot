const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot, message, args) => {
  if (message.channel.id === "585993258589618216") {
  //if (message.channel.id === "606102226468864000") {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'anal'})
    .end((err, response) => {
      message.channel.send({ file: response.body.message });
    });
  } else {
    message.channel.send(`You can use this command only in <#585993258589618216> channel!`)
  }
}

module.exports.help = {
    name: "anal"
}
