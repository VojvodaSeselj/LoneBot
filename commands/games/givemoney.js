const User = require("../../models/user.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "givemoney",
    aliases: [],
    category: "Moderation",
    description: "Give member money in bank or cash.",
    usage: "GiveMoney <User> <Amount> <Cash/Bank>",
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let guild = await Guild.findOne({
      Guild: guildid
    });
    if (!message.member.roles.some(r=>["Lonewolf", "God"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: ${guild.Prefix}${module.exports.usage}`);
    let cUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!cUser) return message.channel.send("User not found!");

    const amount = parseInt(args.slice(1).join(" "));
    if (!amount) return message.reply("You need to supply a amount you want to give!");
    if (isNaN(amount)) return message.reply("You need to supply amount in numbers!");
    if (amount < 0) return message.reply("Amount cannot be less than 0!");

    let method = args.slice(2).join(" ");
    if (method !== "Bank" && method !== "Cash") return message.reply("You need to put method,either Bank or Cash!");
    if (!isNaN(method)) return message.reply("You need to put method,either Bank or Cash!");

    let user = await User.findOne({
      Guild: guildid,
      ID: cUser.id
    });
    let cash = user.Cash;
    let bank = user.Bank;

    if (method === "Bank") {
      user.Bank = bank + amount;
      message.reply(`You added ${amount}$ to ${cUser}'s bank!`);
    } else if (method === "Cash") {
      user.Cash = cash + amount;
      message.reply(`You added ${amount}$ to ${cUser}'s cash!`);
    }
    user.save()
  }
}
