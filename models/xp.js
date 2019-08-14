const mongoose = require("mongoose");

const XpSchema = mongoose.Schema({
    Name: String,
    ID: String,
    Guild: String,
    Xp: Number,
    Level: Number
});

module.exports = mongoose.model("Xp", XpSchema);
