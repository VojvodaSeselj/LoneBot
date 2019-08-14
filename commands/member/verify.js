const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    if (!message.guild.id === "585827148212862978") return;
    if (!message.member.roles.some(r=>["Newbie"].includes(r.name))) return message.delete(1000);
    let vUser = message.member;
    let vRole = message.guild.roles.find(role => role.name === "Member");
    let rRole = message.guild.roles.find(role => role.name === "Newbie")
    if (!vRole) return message.reply("Couldn't find that role");
    let verifyembed = new Discord.RichEmbed()
        .setDescription("Verify")
        .setColor("#0785ed")
        .addField("New Member", `${message.author.username}`)
        .addField("Time", message.createdAt)

    let verifychannel = message.guild.channels.find(channel => channel.name === "verify");
    if (!verifychannel) return message.reply("Couldn't find verify channel.");

    message.delete(1000);
    verifychannel.send(verifyembed);

    if (!vUser.roles.has(vRole.id))
    await(vUser.addRole(vRole.id));
    await(vUser.removeRole(rRole.id))
}

module.exports.help = {
    name: "verify"
}
