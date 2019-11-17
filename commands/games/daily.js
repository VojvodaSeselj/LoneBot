const User = require("../../models/user.js");

module.exports = {
    name: "daily",
    aliases: [],
    category: "Games",
    description: "Get daily money.",
    usage: "Daily",
    example: "Daily",
    cooldown: 86400,
    run: async (bot, message, args) => {
      let bankAdd = Math.floor(Math.random() * 2000) + 700;
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
