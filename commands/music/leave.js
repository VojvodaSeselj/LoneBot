const ytdl = require("ytdl-core");

module.exports.run = async(bot, message, args) => {
    if (!message.member.voiceChannel) return message.channel.send("You need to connect to a voice channel.");
    if (!message.guild.me.voiceChannel) return message.channel.send("Bot isn't connected to the channel.");
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("You aren't connected to same channel as bot");
    message.guild.me.voiceChannel.leave();
    message.channel.send("Leaving Channel.");
}
module.exports.help = {
    name: "leave"
}
