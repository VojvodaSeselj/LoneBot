const Guild = require("../models/guild.js");
const Mute = require("../models/mute.js");

module.exports = (bot) => {
  console.log(`Bot - ${bot.user.username} is online!`);
  bot.user.setActivity(`Type .help for help!`);

  setInterval(async () => {
      const mutes = await Mute.find({});
      for(const mute of mutes) {
          if(mute.Created + mute.Time <= Date.now()) {
              const guild = bot.guilds.get(mute.Guild);
              if(!guild) return;
              const member = guild.members.get(mute.MutedUser.ID);
              if(!member) continue;
              if(mute.Type === "Voice") {
                let voiceRole = guild.roles.find((x) => x.name === "Voice Muted");
                if(!voiceRole) voiceRole = guild.createRole({ name:"Voice Muted", color:"#27272b", permissions:[] });
                if(!member.roles.has(voiceRole.id)) return;
                member.removeRole(voiceRole)
              } else if(mute.Type === "Chat") {
                let chatRole = guild.roles.find((x) => x.name === "Chat Muted");
                if(!chatRole) chatRole = guild.createRole({ name:"Chat Muted", color:"#27272b", permissions:[] });
                if(!member.roles.has(chatRole.id)) return;
                member.removeRole(chatRole);
              }
              Mute.deleteOne({ Guild: mute.Guild, MutedUser: { Username: member.user.username, ID: member.user.id }}, err => {
                  if(err) console.log(err);
              });
              const logGuild = await Guild.findOne({ Guild: guild.id });
              const logChannel = guild.channels.find(channel => channel.name === logGuild.LogsChannel);
              if(!logChannel) return;
              logChannel.send(`Unmuted ${member.user}!`);
          }
      }
  }, 1000);
}
