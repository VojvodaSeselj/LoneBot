const mongoose = require("mongoose");

const vmuteSchema = mongoose.Schema({
    Guild: String,
    VoiceMutedUser: {
      Username: String,
      ID: String,
    },
    VoiceMutedBy: {
      Username: String,
      ID: String,
    },
    Reason: String,
    Time: String
});

module.exports = mongoose.model("Vmute", vmuteSchema);
