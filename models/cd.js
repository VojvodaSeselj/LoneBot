const mongoose = require("mongoose");

const cdSchema = mongoose.Schema({
    Guild: String,
    CommandName: String,
    Used: Number,
    UsedBy: String,
    Cooldown: Number,
});

module.exports = mongoose.model("CD", cdSchema);
