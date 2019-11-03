const User = require("../../models/user.js");
const Guild = require("../../models/guild.js");
const stoleRecently = new Set();
const minute = 60000;
const hour = minute * 3;

module.exports = {
    name: "steal",
    aliases: [],
    category: "Games",
    description: "Steal money from other member.",
    usage: "Steal <User>",
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let guild = await Guild.findOne({
      Guild: guildid
    });
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: ${guild.Prefix}${module.exports.usage}`);
    if (stoleRecently.has(message.author.id)) {
      message.channel.send(`<@${message.author.id}> you need to wait another 3 hours before being able to steal again!`);
      }  else {
    const member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!member) return message.reply("User not found!");
    if (member.id == message.author.id) return message.reply("You cannot pay to yourself!");

    const [moneyTo, stealFrom] = await Promise.all([
      User.findOne({ Guild: message.guild.id, ID: message.author.id }),
      User.findOne({ Guild: message.guild.id, ID: member.id })
    ]);
    let chance = Math.ceil(Math.random() * 100);
    percentageSteal = stealFrom.Cash * 0.2
    percentageLost = moneyTo.Cash * 0.2
    let stealCash = Math.floor(Math.random() * percentageSteal);
    if (stealCash < 1) stealCash += 1
    if (stealFrom.Cash === 0) return message.reply("User you want to steal from have 0$ in cash!");
    let lostCoins = Math.floor(Math.random() * percentageLost) + 100;
    if (chance > 1){
    moneyTo.Cash = moneyTo.Cash += stealCash;
    stealFrom.Cash = stealFrom.Cash -= stealCash;
    moneyTo.save();
    stealFrom.save();
    message.channel.send(`<@${message.author.id}> you stole **${stealCash}**$ from <@${member.id}>.`);
  } else if (chance <= 100){
    moneyTo.Cash = moneyTo.Cash - lostCoins;
    moneyTo.save();
    message.channel.send(`<@${message.author.id}> you were busted stealing and fined **${lostCoins}**$`);
    }
    stoleRecently.add(message.author.id);
    setTimeout(() => {
      stoleRecently.delete(message.author.id);
    }, 1000);
    }
  }
}
