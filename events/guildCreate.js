const Guild = require("../models/guild.js");

module.exports = async (bot, guild) => {
  let newguild = await Guild.findOne({
    Guild: guild.id
  });
  if (!newguild) {
    newguild = new Guild({
      Guild: guild.id,
      AdminRole: "",
      ModeratorRole: "",
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
      LogsChannel: ""
    });
  }
  newguild.save().catch(err => console.log(err));
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  }
