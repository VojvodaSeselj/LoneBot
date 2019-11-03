module.exports = {
    name: "ping",
    aliases: [],
    category: "Member",
    description: "Shows bot's Latency and API Latency.",
    usage: "Ping",
    run: async (bot, message, args) => {
  const msg = await message.channel.send("Pinging...");
  msg.edit(`Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
  }
}
