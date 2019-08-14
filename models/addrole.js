const mongoose = require("mongoose");

const aroleSchema = mongoose.Schema({
    Guild: String,
    RoleGivenUser: {
      Username: String,
      ID: String,
    },
    RoleGivenBy: {
      Username: String,
      ID: String,
    },
    RoleGiven: String,
    Time: String
});

module.exports = mongoose.model("AddRole", aroleSchema);
