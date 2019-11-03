const User = require("../../models/user.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "deposit",
    aliases: ["dep"],
    category: "Games",
    description: "Deposit money in bank.",
    usage: "Deposit <Amount>",
    run: async (bot, message, args) => {
  let guildid = message.guild.id;
  let guild = await Guild.findOne({
    Guild: guildid
  });
  if (!args[0]) {
    return message.reply("You need to provide amount of money you want to deposit!").then(m => m.delete(5000));
  }

  const amount = parseInt(args.slice(0).join(" "));
  if (!amount) {
    return message.reply("You need to supply amount you want to deposit!");
  }
  if (isNaN(amount)) {
    return message.reply("You need to supply amount in numbers!");
  }
  if (amount >= message.author.Cash) {
    return message.reply("You cannot deposit money you don't have!");
  }
  if (amount < 0) {
  return message.reply("Amount cannot be less than 0$!");
  }

  const [depositTo] = await Promise.all([
    User.findOne({ Guild: message.guild.id, ID: message.author.id })
  ]);

  if (depositTo.Cash < amount) {
    return message.reply(`You have ${depositTo.Cash}$ in cash,you cannot deposit ${amount}$.`);
  }
  depositTo.Bank = depositTo.Bank += amount;
  depositTo.Cash = depositTo.Cash -= amount;
  depositTo.save();

  message.channel.send(`**<@${message.author.id}>** you have deposited **${amount}**$.`);
  }
}
