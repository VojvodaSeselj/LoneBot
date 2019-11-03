const Guild = require("../models/guild.js");

module.exports = async (bot, guild) => {
  let guildid = guild.id;
  let newguild = await Guild.findOne({
    Guild: guildid
  });
  if (!newguild) {
    newguild = new Guild({
      GuildName: message.guild.name,
      Guild: guildid,
      AdminRoles: [],
      ModeratorRoles: [],
      Prefix: ".",
      Nsfw: false,
      Verify: {
        Enabled: false,
        VerifyRole: "",
        VerifiedRole: "",
        Channel: "",
        LogsChannel: "",
      },
      Welcome: {
        Enabled: false,
        Channel: "",
        Message: "",
      },
      Leave: {
        Enabled: false,
        Channel: "",
        Message: "",
      },
      AutoRoles: {
        Enabled: false,
        Roles: [],
      },
      LogChannel: ""
    });
  }
  newguild.save().catch(err => console.log(err));
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  }
