const { RichEmbed } = require("discord.js");
const User = require("../../models/user.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "coinflip",
    aliases: ["cf", "cflip"],
    category: "Games",
    description: "Gamble on which side coin will land.",
    usage: "CoinFlip <Heads or Tails> <Amount>",
    run: async (bot, message, args) => {
  let guildid = message.guild.id;
  let guild = await Guild.findOne({
    Guild: guildid
  });

  let betside = args[0];
  let amount = parseInt(args[1]);

  const user = await User.findOne({
    Guild: guildid,
    ID: message.author.id
  });

  if (betside == "h" || betside.includes("heads")) betside = 0;
  else if (betside == "t" || betside.includes("tails")) betside = 1;
  else return message.reply("You must chose between Heads and Tails.");

  let cash = user.Cash;

  if (!amount) {
    return message.reply("You need to suply amount of money you want to bet on that side!");
  }
  if (isNaN(amount)) {
    return message.reply("You need to supply amount you want to bet in numbers!");
  }

  if (cash - amount < 0) {
    return message.channel.send(`${message.author}, Sorry, you are betting more than you have!`);
  }

  if (amount < 0) {
    return message.reply("Amount cannot be less than 0$!");
  }

  let side = [
    "Heads",
    "Tails"
  ]
  let outcome = side[Math.floor(Math.random()*side.length)]
  outcome = outcome.toLowerCase()
  if (outcome == "h" || outcome.includes("heads")) outcome = 0
  else if (outcome == "t" || outcome.includes("tails")) outcome = 1

  if (outcome == 0 && betside == 0) {
    let headsEmbed = new RichEmbed()
      .setTitle("Coinflip")
      .setDescription(`${message.author}, It landed on Head and you got ${amount * 1.5}$.`)
      .setColor("#00ff0d")
      .setFooter(message.author.tag, message.author.avatarURL)
      .attachFiles(['./slike/head.png'])
      .setThumbnail('attachment://head.png');
    message.channel.send(headsEmbed)
    amount = parseInt(amount * 1.5)
    user.Cash = user.Cash + amount;
  } else if (outcome == 1 && betside == 1) {
    let tailsEmbed = new RichEmbed()
      .setTitle("Coinflip")
      .setDescription(`${message.author}, It landed on Tail and you got ${amount * 1.5}$.`)
      .setColor("#00ff0d")
      .setFooter(message.author.tag, message.author.avatarURL)
      .attachFiles(['./slike/tail.png'])
      .setThumbnail('attachment://tail.png');
    message.channel.send(tailsEmbed)
    amount = parseInt(amount * 1.5)
    user.Cash = user.Cash + amount;
  } else if (outcome == 1 && betside == 0) {
    let lostEmbed = new RichEmbed()
      .setTitle("Coinflip")
      .setDescription(`${message.author}, It landed on Tail and you lost ${amount}$.`)
      .setColor("#ff0000")
      .setFooter(message.author.tag, message.author.avatarURL)
      .attachFiles(['./slike/tail.png'])
      .setThumbnail('attachment://tail.png');
      message.channel.send(lostEmbed)
      user.Cash = user.Cash - amount;
    } else if (outcome == 0 && betside == 1) {
      let lostEmbed = new RichEmbed()
        .setTitle("Coinflip")
        .setDescription(`${message.author}, It landed on Head and you lost ${amount}$.`)
        .setColor("#ff0000")
        .setFooter(message.author.tag, message.author.avatarURL)
        .attachFiles(['./slike/head.png'])
        .setThumbnail('attachment://head.png');
        message.channel.send(lostEmbed)
        user.Cash = user.Cash - amount;
  }
  user.save();
  }
}
