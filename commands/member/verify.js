const { RichEmbed } = require("discord.js");
const Guild = require("../../models/guild.js");

module.exports = {
    name: "verify",
    aliases: [],
    category: "Member",
    description: "Verify yourself.",
    usage: "Verify",
    cooldown: 5,
    run: async (bot, message, args) => {
  let guildid = message.guild.id;
  let guild = await Guild.findOne({
    Guild: guildid
  });
  let verifychannel = guild.VerifyChannel
  if (message.channel.name !== verifychannel) return message.delete();
  if (!message.member.roles.some(r=>[guild.VerifyRole].includes(r.name)) && message.member.roles.some(r=>[guild.VerifiedRole].includes(r.name))) return message.reply("You are already verified!").then(m => m.delete(3000))
  if (guild.VerifiedRole === "" || guild.VerifyRole === "" || guild.VerifyChannel === "" || guild.VerifyLogChannel === "") return message.delete() && message.reply(`Verify is not set up correctly.To see how to set it up do **${guild.Prefix}botconfig**!`).then(m => m.delete(3000));
  if (guild.Verify !== "true") return message.delete() && message.reply(`Verify is disabled.To enable it do **${guild.Prefix}enableverify**!`).then(m => m.delete(3000));
    if (guild.Verify === "true" && guild.VerifiedRole !== "" && guild.VerifyRole !== "" && guild.VerifyChannel !== "" && guild.VerifyLogChannel !== "") {
    let verifyRole = message.guild.roles.find(role => role.name === guild.VerifyRole);
    let verifiedRole = message.guild.roles.find(role => role.name === guild.VerifiedRole);
    if (!verifiedRole) return message.reply("Couldn't find that role");
    let verifyembed = new RichEmbed()
        .setDescription("Verify")
        .setColor("#00c3df")
        .addField("New Member", `${message.author.username}`)
        .addField("Time", message.createdAt)

    let verifylogchannel = message.guild.channels.find(channel => channel.name === guild.VerifyLogChannel);
    if (!verifylogchannel) return message.reply("Couldn't find verify log channel.");

    message.member.addRole(verifiedRole.id);
    message.member.removeRole(verifyRole.id);

    message.delete(1000);
    verifylogchannel.send(verifyembed);
    }
  }
}
