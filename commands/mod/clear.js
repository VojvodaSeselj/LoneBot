const Discord = require("discord.js");


module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .clear <Number of lines>`);

    let clearMsgs = parseInt(args[0]);

    if(isNaN(clearMsgs)) return message.channel.send("Make sure the amount is a number!");
    if(clearMsgs >= 100) return message.channel.send("Make sure that you specify an amount lower than 100!");

    if(clearMsgs < 100){
    message.channel.bulkDelete(clearMsgs + 1).then(msg => {
    message.channel.send(`Deleted ${clearMsgs} messages!`).then(msg => msg.delete(5000));
    });
  }
}

module.exports.help = {
    name: "clear"
}
