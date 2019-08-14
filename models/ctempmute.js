const mongoose = require("mongoose");

const ctempmuteSchema = mongoose.Schema({
    Guild: String,
    ChatTempMutedUser: {
      Username: String,
      ID: String,
    },
    ChatTempMutedBy: {
      Username: String,
      ID: String,
    },
    MuteLength: String,
    Reason: String,
    Time: String
});

module.exports = mongoose.model("ChatTempMute", ctempmuteSchema);
