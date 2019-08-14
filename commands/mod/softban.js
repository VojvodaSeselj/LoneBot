const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const SoftBan = require("../../models/softban.js");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .softban <User> <Time-1s,m,h,d> <Reason>`);
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.reply("User not found!");
    if (bUser.roles.some(r=>["Lonewolf", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("You can't soft ban this user!");
    let softbanrole = message.guild.roles.find(role => role.name === "SoftBanned");
    let bReason = args.slice(2).join(" ");
    if (!bReason) return message.reply("Please supply a reason.");
    if (!softbanrole) {
        try {
            softbanrole = await message.guild.createRole({
                name: "SoftBanned",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async(channel, id) => {
                await channel.overwritePermissions(softbanrole, {
                    READ_MESSAGES: false,
                    SEND_MESSAGES: false,
                    EMBED_LINKS: false,
                    ATTACH_FILES: false,
                    READ_MESSAGE_HISTORY: false,
                    MENTION_EVERYONE: false,
                    EXTERNAL_EMOJIS: false,
                    CONNECT: false,
                    SPEAK: false,
                    CHANGE_NICKNAME: false,
                })
            })
        } catch (e) {
            console.log(e.stack);
        }
    }
    let bantime = args[1];
    if (!bantime) return message.reply("You didn't specify a time!");
    //if( !bantime.includes("s", "m", "h", "d")) return message.reply("You need to put value at the end of time,example (30s)-30 seconds.You can use s,m,h or d!");
    message.delete().catch(O_o => {});

    let softbanembed = new Discord.RichEmbed()
        .setAuthor(bUser.user.tag, bUser.user.avatarURL)
        .setColor("#ff9400")
        .addField("Soft Banned User ID", `**${bUser.user.id}**`)
        .addField("Soft Banned By", `<@${message.author.id}> with ID **${message.author.id}**`)
        .addField("Time", message.createdAt)
        .addField("Length", bantime)
        .addField("Reason", bReason);

    let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
    if (!logschannel) return message.reply("Couldn't find logs channel.");
    logschannel.send(softbanembed);

    await(bUser.addRole(softbanrole.id));
    message.channel.send(`<@${bUser.id}> you have been soft banned for **${bReason}** and will be unbanned in **${bantime}**!`);

    setTimeout(function() {
        bUser.removeRole(softbanrole.id);
        message.channel.send(`<@${bUser.id}> you have been unbanned,please do not repeat mistakes.`);
    }, ms(bantime));

    const softban = new SoftBan({
        Guild: message.guild.id,
        SoftBannedUser: {
          Username: bUser.user.username,
          ID: bUser.user.id,
        },
        SoftBannedBy: {
          Username: message.author.username,
          ID: message.author.id,
        },
        SoftBannedLength: bantime,
        Reason: bReason,
        Time: message.createdAt

    });

    softban.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
}
module.exports.help = {
    name: "softban"
}
