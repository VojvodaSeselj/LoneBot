const User = require("../../models/user.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "pay",
    aliases: [],
    category: "Games",
    description: "Pay money to somebody.",
    usage: "Pay <User> <Amount>",
    run: async (bot, message, args) => {
  let guildid = message.guild.id;
  let guild = await Guild.findOne({
    Guild: guildid
  });
  if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: ${guild.Prefix}${module.exports.usage}`);

  const member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!member) return message.reply("User not found!");
  if (member.id == message.author.id) return message.reply("You cannot pay to yourself!");

  const amount = parseInt(args.slice(1).join(" "));
  if (!amount) return message.reply("You need to supply a amount you want to pay!");
  if (isNaN(amount)) return message.reply("You need to supply amount in numbers!");
  if (amount >= message.author.Cash) return message.reply("You cannot pay with money you don't have!");
  if (amount < 0) return message.reply("Amount cannot be less than 0$!");

  const [payTo, payFrom] = await Promise.all([
    User.findOne({ Guild: message.guild.id, ID: member.id }),
    User.findOne({ Guild: message.guild.id, ID: message.author.id })
  ]);
  if (payFrom.Cash < amount) return message.reply(`You have ${payFrom.Cash}$, you cannot pay ${amount}$.`);
  payTo.Cash = payTo.Cash += amount;
  payFrom.Cash = payFrom.Cash -= amount;
  payTo.save();
  payFrom.save();

  message.channel.send(`**<@${message.author.id}>** you payed **${amount}**$ coins to **<@${member.id}>**.`);
  }
}
