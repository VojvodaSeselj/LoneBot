const Discord = require("discord.js");
const mongoose = require("mongoose");
const Confession = require("../../models/confession.js");

module.exports.run = async(bot, message, args) => {
  if (message.guild.id === "585827148212862978") {
  if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .confess <Confession>`);
  let cMessage = args.slice(0).join(" ")
  if (!cMessage) return message.channel.send("You need to put your confession!");
  let confessionchannel = message.guild.channels.find(channel => channel.name === "confession-channel");
  if (!confessionchannel) return message.reply("Couldn't find logs channel.");

  const confession = new Confession({
      Guild: message.guild.id,
      ID: message.author.id,
      Name: message.author.username,
      Confession: cMessage,
      Time: message.createdAt
  });

  message.delete().catch(O_o => {});
  confessionchannel.send(`**Confession**: ${cMessage}`);
  confession.save()
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
}

module.exports.help = {
    name: "confess"
}
