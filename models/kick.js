const mongoose = require("mongoose");

const kickSchema = mongoose.Schema({
    Guild: String,
    KickedUser: {
      Username: String,
      ID: String,
    },
    KickedBy: {
      Username: String,
      ID: String,
    },
    Reason: String,
    Time: String
});

module.exports = mongoose.model("Kick", kickSchema);
