const Discord = require ('discord.js');

module.exports.run = (bot, message) => {
  console.log(`B - ${bot.user.username} is online!`);
  bot.user.setActivity("Type .help for help!");

}
module.exports.help = {
    name: "ready"
}
