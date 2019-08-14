const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const Cmute = require("../../models/cmute.js");

module.exports.run = async(bot, message, args) => {
    if (!message.member.roles.some(r=>["Lonewolf", "God", "⚒ Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("Sorry, you don't have permissions to use this!");
    if (!args[0]) return message.channel.send(`${message.author}, Usage for this command is: .cmute <User> <Reason>`);
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!mUser) return message.reply("User not found!");
    if (mUser.roles.some(r=>["Lonewolf", "⚒ Moderator ⚒", "⚒ VC Moderator ⚒", "⚒ Chat Moderator ⚒"].includes(r.name))) return message.reply("You can't mute this user!");
    let cmuterole = message.guild.roles.find(role => role.name === "ChatMuted");
    let mReason = args.slice(1).join(" ");
    if (!mReason) return message.reply("Please supply a reason.");
    if (!cmuterole) {
        try {
            cmuterole = await message.guild.createRole({
                name: "ChatMuted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async(channel, id) => {
                await channel.overwritePermissions(cmuterole, {
                    ADD_REACTIONS: false,
                    SEND_MESSAGES: false,
                    MANAGE_MESSAGES: false,
                    EMBED_LINKS: false,
                    ATTACH_FILES: false
                })
            })
        } catch (e) {
            console.log(e.stack);
        }
    }
    message.delete().catch(O_o => {});

    let cmuteembed = new Discord.RichEmbed()
        .setAuthor(mUser.user.tag, mUser.user.avatarURL)
        .setColor("#ff9400")
        .addField("Chat Muted User ID", `**${mUser.user.id}**`)
        .addField("Chat Muted By", `<@${message.author.id}> with ID **${message.author.id}**`)
        .addField("Time", message.createdAt)
        .addField("Reason", mReason);

    let logschannel = message.guild.channels.find(channel => channel.name === "moderation-logs");
    if (!logschannel) return message.reply("Couldn't find logs channel.");
    logschannel.send(cmuteembed);

    await(mUser.addRole(cmuterole.id));
    message.channel.send(`<@${mUser.id}> you have been chat muted for **${mReason}**!`);

    const cmute = new Cmute({
        Guild: message.guild.id,
        ChatMutedUser: {
          Username: mUser.user.username,
          ID: mUser.user.id,
        },
        ChatMutedBy: {
          Username: message.author.username,
          ID: message.author.id,
        },
        Reason: mReason,
        Time: message.createdAt

    });

    cmute.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
}
module.exports.help = {
    name: "cmute"
}
