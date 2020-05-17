const Discord = require("discord.js");


module.exports = {
    name: "serverlist",
    aliases: [],
    category: "Creator",
    description: "Get invite links for all servers bot is in.",
    usage: "ServerList",
    example: "ServerList",
    cooldown: 5,
    run: async (bot, message, args) => {

let invites = ["Ignore me!"], ct = 0;
bot.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
        invites[invites.length + 1] = (g + " - `Invites: " + guildInvites.array().join(", ") + "`");
        ct++;

        if(ct >= bot.guilds.size) {
            invites.forEach((invite, i) => {
                if(invite == undefined)
                    invites.splice(i, 1);
            });

            invites.shift();
            invites.forEach((invite, i) => invites[i] = "- " + invite);
            invites = invites.join("\n\n");

            let embed = new Discord.RichEmbed()
            .setTitle("All Invites:")
            .setDescription(invites);
          message.channel.send(embed);
            }
        }).catch(err => {
            ct++;
        });
    });
  }
}
