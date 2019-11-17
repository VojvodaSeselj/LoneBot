const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    Guild: String,
    ID: String,
    XP: Number,
    Level: Number,
    Cash: Number,
    Bank: Number,
    Joined: String
});

module.exports = mongoose.model("User", userSchema);
