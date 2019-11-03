const mongoose = require("mongoose");

const muteSchema = mongoose.Schema({
    Guild: String,
    MutedUser: {
      Username: String,
      ID: String,
    },
    MutedBy: {
      Username: String,
      ID: String,
    },
    Type: String,
    Time: Number,
    Created: Number,
    Reason: String,
});

module.exports = mongoose.model("Mute", muteSchema);
