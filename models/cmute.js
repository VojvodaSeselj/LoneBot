const mongoose = require("mongoose");

const cmuteSchema = mongoose.Schema({
    Guild: String,
    ChatMutedUser: {
      Username: String,
      ID: String,
    },
    ChatMutedBy: {
      Username: String,
      ID: String,
    },
    Reason: String,
    Time: String
});

module.exports = mongoose.model("Cmute", cmuteSchema);
