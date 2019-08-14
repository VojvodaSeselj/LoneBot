const mongoose = require("mongoose");

const rroleSchema = mongoose.Schema({
    Guild: String,
    RoleRemovedUser: {
      Username: String,
      ID: String,
    },
    RoleRemovedBy: {
      Username: String,
      ID: String,
    },
    RoleRemoved: String,
    Time: String
});

module.exports = mongoose.model("RemoveRole", rroleSchema);
