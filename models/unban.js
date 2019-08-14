const mongoose = require("mongoose");

const unbanSchema = mongoose.Schema({
    Guild: String,
    UnbannedUser: {
      ID: String,
    },
    UnbannedBy: {
      Username: String,
      ID: String,
    },
    Time: String
});

module.exports = mongoose.model("UnBan", unbanSchema);
