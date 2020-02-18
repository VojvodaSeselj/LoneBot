const { getMember } = require("../../functions.js");
const User = require("../../models/user.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "removemoney",
    aliases: [],
    category: "Admin",
    description: "Remove member's money from bank or cash.",
    usage: "RemoveMoney <User> <Amount> <Cash/Bank>",
    example: "RemoveMoney @Username#9287 6000 Cash",
    cooldown: 5,
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let guild = await Guild.findOne({
      Guild: guildid
    });

    if (!message.member.roles.some(r=>guild.AdminRole.includes(r.name)) && !message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply("Sorry, you don't have permissions to use this!");
    }
    if (!args[0]) {
      return message.reply("You need to specify member you want to remove money from!");
    }
    let cUser = await getMember(message, args[0]);
    if (!cUser) {
      return message.reply("User not found!");
    }

    if (!args[1]) {
      return message.reply("You need to specify amount of money you want to remove from this member!");
    }
    const amount = parseInt(args.slice(1).join(" "));
    if (!amount) {
      return message.reply("You need to supply a amount you want to remove!");
    }
    if (isNaN(amount)) {
      return message.reply("You need to supply amount in numbers!");
    }
    if (amount < 0) {
      return message.reply("Amount cannot be less than 0!");
    }

    if (!args[2]) {
      return message.reply("You need to specify methot,either Bank or Cash!");
    }
    let method = args.slice(2).join(" ");
    method = method.toLowerCase();
    if (method != "bank" && method != "cash") return message.reply("You need to put method,either Bank or Cash!");

    let user = await User.findOne({
      Guild: guildid,
      ID: cUser.id
    });
    let cash = user.Cash;
    let bank = user.Bank;

    if (method == "b" || method.includes("bank")) {
      user.Bank = bank - amount;
      message.reply(`You removed ${amount}$ from ${cUser}'s bank!`);
    } else if (method == "c" || method.includes("cash")) {
      user.Cash = cash - amount;
      message.reply(`You removed ${amount}$ from ${cUser}'s cash!`);
    }
    user.save()
  }
}
