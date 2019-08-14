const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const Vmute = require("../../models/vmute.js");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .vmute <User> <Reason>`);
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!mUser) return message.reply("User not found!");
    if (mUser.roles.some(r=>["Lonewolf", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("You can't mute this user!");
    let vmuterole = message.guild.roles.find(role => role.name === "VoiceMuted");
    let mReason = args.slice(1).join(" ");
    if (!mReason) return message.reply("Please supply a reason.");
    if (!vmuterole) {
        try {
            vmuterole = await message.guild.createRole({
                name: "VoiceMuted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async(channel, id) => {
                await channel.overwritePermissions(vmuterole, {
                    SPEAK: false,
                })
            })
        } catch (e) {
            console.log(e.stack);
        }
    }
    message.delete().catch(O_o => {});

    let vmuteembed = new Discord.RichEmbed()
        .setAuthor(mUser.user.tag, mUser.user.avatarURL)
        .setColor("#ff9400")
        .addField("Voice Muted User ID", `**${mUser.user.id}**`)
        .addField("Voice Muted By", `<@${message.author.id}> with ID **${message.author.id}**`)
        .addField("Time", message.createdAt)
        .addField("Reason", mReason);

    let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
    if (!logschannel) return message.reply("Couldn't find logs channel.");
    logschannel.send(vmuteembed);

    await(mUser.addRole(vmuterole.id));
    message.channel.send(`<@${mUser.id}> you have been voice muted for **${mReason}**!`);

    const vmute = new Vmute({
        Guild: message.guild.id,
        VoiceMutedUser: {
          Username: mUser.user.username,
          ID: mUser.user.id,
        },
        VoiceMutedBy: {
          Username: message.author.username,
          ID: message.author.id,
        },
        Reason: mReason,
        Time: message.createdAt

    });

    vmute.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
}
module.exports.help = {
    name: "vmute"
}
