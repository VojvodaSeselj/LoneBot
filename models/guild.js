const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    GuildName: String,
    Guild: String,
    AdminRole: String,
    ModeratorRole: String,
    Prefix: String,
    Nsfw: Boolean,
    Xp: Boolean,
    Verify: {
      Enabled: Boolean,
      VerifyRole: String,
      VerifiedRole: String,
      Channel: String,
      LogsChannel: String,
    },
    Welcome: {
      Enabled: Boolean,
      Channel: String,
      Message: String,
    },
    Leave: {
      Enabled: Boolean,
      Channel: String,
      Message: String,
    },
    AutoRoles: {
      Enabled: Boolean,
      Roles: Array,
    },
    LogsChannel: String
});

module.exports = mongoose.model("Guild", guildSchema);
