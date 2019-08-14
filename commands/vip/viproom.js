const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

  let rUser = message.author;
  if (!message.member.roles.some(r=>["V.I.P"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
  if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .viproom <Room Name> <Room Slots>`);
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
}
module.exports.help = {
    name: "viproom"
}
