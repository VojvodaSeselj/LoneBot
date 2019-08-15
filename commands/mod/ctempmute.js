const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const ChatTempMute = require("../../models/ctempmute.js");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒","⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .ctempmute <User> <Time-1s,m,h,d> <Reason>`);

    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!mUser) return message.reply("User not found!");
    if (mUser.roles.some(r=>["Lonewolf", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("You can't mute this user!");

    let ctempmuterole = message.guild.roles.find(role => role.name === "ChatMuted");

    let mReason = args.slice(2).join(" ");
    if (!mReason) return message.reply("Please supply a reason.");
    
    if (!ctempmuterole) {
        try {
            ctempmuterole = await message.guild.createRole({
                name: "ChatMuted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async(channel, id) => {
                await channel.overwritePermissions(ctempmuterole, {
                    ADD_REACTIONS: false,
                    SEND_MESSAGES: false,
                    SEND_TTS_MESSAGES: false,
                    MANAGE_MESSAGES: false,
                    EMBED_LINKS: false,
                    ATTACH_FILES: false
                })
            })
        } catch (e) {
            console.log(e.stack);
        }
    }

    let mutetime = args[1];
    if (!mutetime) return message.reply("You didn't specify a time!");
    if( !mutetime.includes("s", "m", "h", "d")) return message.reply("You need to put value at the end of time,example (30s)-30 seconds.You can use s,m,h or d!");
    message.delete().catch(O_o => {});

    let ctempmuteembed = new Discord.RichEmbed()
        .setAuthor(mUser.user.tag, mUser.user.avatarURL)
        .setColor("#ff9400")
        .addField("Chat Muted User ID", `**${mUser.user.id}**`)
        .addField("Chat Muted By", `<@${message.author.id}> with ID **${message.author.id}**`)
        .addField("Time", message.createdAt)
        .addField("Length", mutetime)
        .addField("Reason", mReason);

    let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
    if (!logschannel) return message.reply("Couldn't find logs channel.");
    logschannel.send(ctempmuteembed);

    await(mUser.addRole(ctempmuterole.id));
    message.channel.send(`<@${mUser.id}> you have been muted for **${mReason}** and will be unmuted in **${mutetime}**!`);

    setTimeout(function() {
        mUser.removeRole(ctempmuterole.id);
        message.channel.send(`<@${mUser.id}> you have been unmuted,please do not repeat mistakes.`);
    }, ms(mutetime));

    const ctempmute = new ChatTempMute({
        Guild: message.guild.id,
        ChatTempMutedUser: {
          Username: mUser.user.username,
          ID: mUser.user.id,
        },
        ChatTempMutedBy: {
          Username: message.author.username,
          ID: message.author.id,
        },
        MuteLength: mutetime,
        Reason: mReason,
        Time: message.createdAt

    });

    ctempmute.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
}
module.exports.help = {
    name: "ctempmute"
}
