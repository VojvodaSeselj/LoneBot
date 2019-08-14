const mongoose = require("mongoose");

const warnSchema = mongoose.Schema({
    Guild: String,
    WarnedUser: {
      Username: String,
      ID: String,
    },
    WarnedBy: {
      Username: String,
      ID: String,
    },
    Reason: String,
    Time: String
});

module.exports = mongoose.model("Warn", warnSchema);
