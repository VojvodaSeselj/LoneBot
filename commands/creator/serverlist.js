const { RichEmbed } = require("discord.js");
const dev_ids = ["311943731072991234"];


module.exports = {
    name: "serverlist",
    aliases: [],
    category: "Creator",
    description: "Get invite links for all servers bot is in.",
    usage: "ServerList",
    example: "ServerList",
    cooldown: 5,
    run: async (bot, message, args) => {
let allowedToUse = false;
dev_ids.forEach(id => {
    if(message.author.id == id)
        allowedToUse = true;
});

if(allowedToUse) {
    let invites = ["ignore me"], ct = 0;
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
    else {
      message.reply("This command can only be used by a developer.");
    }
  }
}
