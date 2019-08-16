const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
        const mojGuild = bot.guilds.get("585827148212862978");

        let helpembed = new Discord.RichEmbed()
            .setDescription("Commands Help")
            .setColor("#000000")
            .addField("**.botinfo**", "Shows information about bot.")
            .addField("**.serverinfo**", "Shows informations about server.")
            .addField("**.avatar [user]**", "Shows avatar of user you want.")
            .addField("**.confess [confession]**", "Sends your confession anonimously in confession-channel.")
            .addField("**.doggo**", "Shows random image of dog.")
            .addField("**.kittie**", "Shows random image of cat.")
            .addField("**.level**", "Shows your level and xp.")
            .addField("**.report [user] [reason]**", "Report somebody with reason.")
            if(message.guild.id  == mojGuild) addField("**.musichelp**", "Give you a list of all music commands.")
            .addField("**.nsfwhelp**", "Give you a list of all nsfw commands.");
            message.channel.send(helpembed);

        let mod = message.guild.roles.find(role => role.name === "⚒ Moderator ⚒");
        let modembed = new Discord.RichEmbed()
            .setDescription("Moderator Help")
            .setColor("#000000")
            .addField("**.ban [user] [reason]**", "Ban user with a reason.")
            .addField("**.unban [userID]**", "Unban user,you need to provide ID")
            .addField("**.kick [user] [reason]**", "Kick user with a reason.")
            .addField("**.warn [user] [reason]**", "Warn user with a reason.")
            .addField("**.warnlevel [user]**", "Show how many warns user have.")
            .addField("**.userinfo [user]**", "Show informations about user.")
            .addField("**.setnick [user] [nick]**", "Set a new nickname for user.")
            .addField("**.deafen [user] [reason]**", "Deafen user with a reason.")
            .addField("**.undeafen [user]**", "UnDeafen user.")
            .addField("**.cmute [user] [reason]**", "Chat mute user with a reason.")
            .addField("**.ctempmute [user] [time] [reason]**", "Temporarily chat mute user with a reason.")
            .addField("**.cunmute [user]**", "Unmute user from chat.")
            .addField("**.vmute [user] [reason]**", "Voice mute user with a reason.")
            .addField("**.vtempmute [user] [time] [reason]**", "Temporarily voice mute user with a reason.")
            .addField("**.vunmute [user]**", "Unmute user from voice.")
            .addField("**.clear [number]**", "Clear chat for specified number of lines.")

        if (message.member.roles.has(mod.id)) {
          try {
              await message.author.send(modembed);
          } catch (e) {
              message.reply("Your DMs are locked. I cannot send you the mod commands.");
            }
        }

        let vcmod = message.guild.roles.find(role => role.name === "⚒ VC Moderator ⚒");
        let vcembed = new Discord.RichEmbed()
            .setDescription("Voice Moderator Help")
            .setColor("#000000")
            .addField("**.kick [user] [reason]**", "Kick user with a reason.")
            .addField("**.warn [user] [reason]**", "Warn user with a reason.")
            .addField("**.warnlevel [user]**", "Show how many warns user have.")
            .addField("**.userinfo [user]**", "Show informations about user.")
            .addField("**.deafen [user] [reason]**", "Deafen user with a reason.")
            .addField("**.undeafen [user]**", "UnDeafen user.")
            .addField("**.vmute [user] [reason]**", "Voice mute user with a reason.")
            .addField("**.vtempmute [user] [time] [reason]**", "Temporarily voice mute user with a reason.")
            .addField("**.vunmute [user]**", "Unmute user from voice.")

        if (message.member.roles.has(vcmod.id)) {
          try {
              await message.author.send(vcembed);
          } catch (e) {
              message.reply("Your DMs are locked. I cannot send you the mod commands.");
            }
        }

        let cmod = message.guild.roles.find(role => role.name === "⚒ Chat Moderator ⚒");
        let cembed = new Discord.RichEmbed()
            .setDescription("Chat Moderator Help")
            .setColor("#000000")
            .addField("**.kick [user] [reason]**", "Kick user with a reason.")
            .addField("**.warn [user] [reason]**", "Warn user with a reason.")
            .addField("**.warnlevel [user]**", "Show how many warns user have.")
            .addField("**.userinfo [user]**", "Show informations about user.")
            .addField("**.cmute [user] [reason]**", "Chat mute user with a reason.")
            .addField("**.ctempmute [user] [time] [reason]**", "Temporarily chat mute user with a reason.")
            .addField("**.cunmute [user]**", "Unmute user from chat.")
            .addField("**.clear [number]**", "Clear chat for specified number of lines.")

        if (message.member.roles.has(cmod.id)) {
          try {
              await message.author.send(cembed);
          } catch (e) {
              message.reply("Your DMs are locked. I cannot send you the mod commands.");
          }
}


}
module.exports.help = {
    name: "help"
}
