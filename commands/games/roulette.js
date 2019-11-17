const { RichEmbed } = require("discord.js");
const User = require("../../models/user.js");
const Guild = require("../../models/guild.js");

function isOdd(num) {
  if ((num % 2) == 0) return false;
  else if ((num % 2) == 1) return true;
}

module.exports = {
    name: "roulette",
    aliases: ["rlt"],
    category: "Games",
    description: "Gamble on roulette.",
    usage: "Roulette <Black,Red,Green> <Amount>",
    example: "Roulette Red 1000",
    cooldown: 5,
    run: async (bot, message, args) => {
    let guildid = message.guild.id;
    let guild = await Guild.findOne({
      Guild: guildid
    });
    let user = await User.findOne({
      Guild: guildid,
      ID: message.author.id
    });
    let cash = user.Cash
    let color = args[0];
    let amount = parseInt(args[1]);

    if (!args[0]) {
      return message.reply("You need to provide color you want to bet on! **Black** , **Red** or **Green**.");
    }
    if (!args[1]) {
      return message.reply("You need to provide amount of money you want to bet on that color!");
    }
    if (amount > 10000) {
      return message.reply("You cannot bet more than 1000$!");
    }
    if (cash - amount < 0) {
      return message.reply("Sorry, you are betting more than you have!");
    }
    if (amount < 0) {
      return message.reply("Amount cannot be less than 0$!");
    }
    if (isNaN(amount)) {
      return message.reply("Amount you want to bet must be in numbers!");
    }
    color = color.toLowerCase()

    if (color == "b" || color.includes("black")) color = 0;
    else if (color == "r" || color.includes("red")) color = 1;
    else if (color == "g" || color.includes("green")) color = 2;
    else {
      return message.reply("You can only bet on Black (1.5x), Red (1.5x), or Green (14x)!");
    }

    let random = Math.floor(Math.random() * 37);

    let lostcolor = color
    if (isOdd(random)) lostcolor = "Red 🔴";
    else if (!isOdd(random)) lostcolor = "Black ⚫";
    else if (random == 0) lostcolor = "Green 💚";

    if (random == 0 && color == 2) { // Green
      let slotsEmbed = new RichEmbed()
        .setTitle("Roulette")
        .setDescription(`${message.author}, You won ${amount * 14}$ \nThe ball landed on: ${random} Green 💚`)
        .setColor("#00ff04")
        .setFooter(message.author.tag, message.author.avatarURL)
        .attachFiles(['./slike/roulette.png'])
        .setThumbnail('attachment://roulette.png');
      message.channel.send(slotsEmbed)
      amount *= 14
      user.Cash = user.Cash + amount;
    } else if (isOdd(random) && color == 1) { // Red
      let slotsEmbed = new RichEmbed()
        .setTitle("Roulette")
        .setDescription(`${message.author}, You won ${amount * 1.5}$ \nThe ball landed on: ${random} Red 🔴`)
        .setColor("#ff0000")
        .setFooter(message.author.tag, message.author.avatarURL)
        .attachFiles(['./slike/roulette.png'])
        .setThumbnail('attachment://roulette.png');
      message.channel.send(slotsEmbed)
      amount = parseInt(amount * 1.5)
      user.Cash = user.Cash + amount;
    } else if (!isOdd(random) && color == 0) { // Black
      let slotsEmbed = new RichEmbed()
        .setTitle("Roulette")
        .setDescription(`${message.author}, You won ${amount * 1.5}$ \nThe ball landed on: ${random} Black ⚫`)
        .setColor("#000000")
        .setFooter(message.author.tag, message.author.avatarURL)
        .attachFiles(['./slike/roulette.png'])
        .setThumbnail('attachment://roulette.png');
      message.channel.send(slotsEmbed)
      amount = parseInt(amount * 1.5)
      user.Cash = user.Cash + amount;
    } else { // Wrong
      let slotsEmbed = new RichEmbed()
        .setTitle("Roulette")
        .setDescription(`${message.author}, You sadly lost ${amount}$ \nThe ball landed on: ${random} ${lostcolor}`)
        .setColor("#7d7d7d")
        .setFooter(message.author.tag, message.author.avatarURL)
        .attachFiles(['./slike/roulette.png'])
        .setThumbnail('attachment://roulette.png');
      message.channel.send(slotsEmbed)
      user.Cash = user.Cash - amount;
    }
    user.save();
  }
}
