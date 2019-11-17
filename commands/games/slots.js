const { RichEmbed } = require("discord.js");
const slotItems = ["🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🍎", "🍑", "🍓", "🍒"];
const User = require("../../models/user.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "slots",
    aliases: [],
    category: "Games",
    description: "Gamble on slots.",
    usage: "Slots <Amount>",
    exampe: "Slots 1000",
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
    let amount = parseInt(args[0]);
    let win = false;

    if (!args[0]) {
      return message.reply("You need to provide amount of money you want to bet on slots!");
    }

    if (amount > 1000) {
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

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { // All 3 the same! 10/1000 or 1% (10 items)
        amount *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { // 2 are the same! 100/1000 or 10%
        amount *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed = new RichEmbed()
            .setDescription(`${slotItems[number[0]]} ${slotItems[number[1]]} ${slotItems[number[2]]} You won ${amount}$`)
            .setColor("#00ff04")
            .setFooter(message.author.tag, message.author.avatarURL)
        message.channel.send({embed: slotsEmbed})
        user.Cash = user.Cash + amount;
    } else {
        let slotsEmbed = new RichEmbed()
            .setDescription(`${slotItems[number[0]]} ${slotItems[number[1]]} ${slotItems[number[2]]} You lost ${amount}$`)
            .setColor("#ff0000")
            .setFooter(message.author.tag, message.author.avatarURL)
        message.channel.send({embed: slotsEmbed})
        user.Cash = user.Cash - amount;
    }
    user.save()
  }
}
