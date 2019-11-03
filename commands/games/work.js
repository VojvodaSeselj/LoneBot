const User = require("../../models/user.js");
const gotCashRecently = new Set();
const minute = 60000;
const hour = minute * 3;

module.exports = {
    name: "work",
    aliases: [],
    category: "Games",
    description: "Get some money by workings.",
    usage: "Work",
    run: async (bot, message, args) => {
  if (gotCashRecently.has(message.author.id)) {
    message.channel.send(`<@${message.author.id}> you need to wait another 3 hours before being able to work again!`);
    }  else {
      let bankAdd = Math.floor(Math.random() * 600) + 300;
      let guild = message.guild.id;
      let user = await User.findOne({
        Guild: guild,
        ID: message.author.id
      });
      let bank = user.Bank;
      user.Bank = bank + bankAdd;
      user.save()
      message.channel.send(`<@${message.author.id}> you got ${bankAdd}$ added to your bank!`);
       gotCashRecently.add(message.author.id);
       setTimeout(() => {
         gotCashRecently.delete(message.author.id);
       }, hour);
     }
  }
}
