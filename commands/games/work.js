const User = require("../../models/user.js");

module.exports = {
    name: "work",
    aliases: [],
    category: "Games",
    description: "Get some money by workings.",
    usage: "Work",
    example: "Work",
    cooldown: 3600,
    run: async (bot, message, args) => {
      let bankAdd = Math.floor(Math.random() * 600) + 300;
      let guild = message.guild.id;
      let user = await User.findOne({
        Guild: guild,
        ID: message.author.id
      });
      let bank = user.Bank;
      user.Bank = bank + bankAdd;
      user.save()
      message.reply(`You got ${bankAdd}$ added to your bank!`);
    }
}
