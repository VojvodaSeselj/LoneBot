const mongoose = require("mongoose");

const softbanSchema = mongoose.Schema({
    Guild: String,
    SoftBannedUser: {
      Username: String,
      ID: String,
    },
    SoftBannedBy: {
      Username: String,
      ID: String,
    },
    SoftBannedLength: String,
    Reason: String,
    Time: String
});

module.exports = mongoose.model("SoftBan", softbanSchema);
