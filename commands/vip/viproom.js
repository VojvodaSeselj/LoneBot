const Discord = require("discord.js");

module.exports = {
    name: "viproom",
    aliases: [],
    category: "VIP",
    description: "Make VIP room.",
    usage: "VIPRoom <Room-Name> [Slots]",
    cooldown: 5,
    run: async (bot, message, args) => {

  let rUser = message.author;
  if (!message.member.roles.some(r=>["V.I.P"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
  if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: ${guild.Prefix}${module.exports.usage}`);
  let rSlots = args.pop();
  if (isNaN(rSlots)) return message.reply("You need to supply room limit 0-99,0 meaning no limit.!");
  let rName = args.join(" ");
  if (!rName) return message.reply("You need to supply a room name!");
  let vchannel = await message.guild.createChannel(rName, {type: 'voice'});
  await vchannel.setUserLimit(rSlots)
  await vchannel.setParent('597559545757433859')
  await setTimeout(function() {
      if (vchannel.members.size === 0){
        vchannel.delete();
        message.channel.send(`${rUser} You didn't join your channel within 10 seconds so it was deleted!`);
    }
  }, 10000);
  if (!message.guild.channels.some(chan => chan.name === rName && chan.type === 'voice')) return;
    await setInterval(function() {
      if (!message.guild.channels.some(chan => chan.name === rName && chan.type === 'voice')) return;
      if (vchannel.members.size === 0){
        vchannel.delete();
        message.channel.send(`${rUser} Your private channel was deleted!`);
    }
  }, 15000);
}
}
