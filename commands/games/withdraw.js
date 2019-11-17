const User = require("../../models/user.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "withdraw",
    aliases: ["with", "wthdraw"],
    category: "Games",
    description: "Withdraw money from bank.",
    usage: "Withdraw <Amount>",
    example: "Withdraw 1000",
    cooldown: 5,
    run: async (bot, message, args) => {
  let guildid = message.guild.id;
  let guild = await Guild.findOne({
    Guild: guildid
  });

  if (!args[0]) {
    return message.reply("You need to supply amount of money you want to withdraw!");
  }

  const amount = parseInt(args.slice(0).join(" "));
  if (!amount) {
    return message.reply("You need to supply amount you want to withdraw!");
  }
  if (isNaN(amount)) {
    return message.reply("You need to supply amount in numbers!");
  }
  if (amount >= message.author.Bank) {
    return message.reply("You cannot withdraw money you don't have!");
  }
  if (amount < 0) {
    return message.reply("Amount cannot be less than 0$!");
  }

  const [withdrawFrom] = await Promise.all([
    User.findOne({ Guild: message.guild.id, ID: message.author.id })
  ]);
  if (withdrawFrom.Bank < amount) {
    return message.reply(`You have ${withdrawFrom.Bank}$ in bank,you cannot withdraw ${amount}$.`);
  }

  withdrawFrom.Bank = withdrawFrom.Bank -= amount;
  withdrawFrom.Cash = withdrawFrom.Cash += amount;
  withdrawFrom.save();

  message.channel.send(`**<@${message.author.id}>** you have withdrawn **${amount}**$.`);
  }
}
