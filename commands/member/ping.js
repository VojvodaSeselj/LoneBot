const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  const msg = await message.channel.send("Pinging...");
  msg.edit(`Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
}

module.exports.help = {
    name: "ping"
}
