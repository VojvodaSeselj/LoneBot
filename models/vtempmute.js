const mongoose = require("mongoose");

const vtempmuteSchema = mongoose.Schema({
    Guild: String,
    VoiceTempMutedUser: {
      Username: String,
      ID: String,
    },
    VoiceTempMutedBy: {
      Username: String,
      ID: String,
    },
    MuteLength: String,
    Reason: String,
    Time: String
});

module.exports = mongoose.model("VoiceTempMute", vtempmuteSchema);
