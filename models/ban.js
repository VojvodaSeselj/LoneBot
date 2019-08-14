const mongoose = require("mongoose");

const banSchema = mongoose.Schema({
    Guild: String,
    BannedUser: {
      Username: String,
      ID: String,
    },
    BannedBy: {
      Username: String,
      ID: String,
    },
    Reason: String,
    Time: String
});

module.exports = mongoose.model("Ban", banSchema);
