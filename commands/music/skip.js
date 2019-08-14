const ytdl = require("ytdl-core");

module.exports.run = async(bot, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  if (!fetched) return message.channel.send("Currently there is no music playing!");
  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("You are not connected to same channel as bot!");
  let userCount = message.member.voiceChannel.members.size;
  let required = Math.ceil(userCount/2);
  if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
  if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`You already voted song to be skipped! ${fetched.queue[0].voteSkips.length}/${required} required.`);
  fetched.queue[0].voteSkips.push(message.member.id);
  ops.active.set(message.guild.id, fetched);
  if (fetched.queue[0].voteSkips.length >= required) {
    message.channel.send("Successfully skipped song!");
    return fetched.dispatched.emit("finish");
  }
  message.channel.send(`Successfully voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`);
}
module.exports.help = {
    name: "skip"
}
