const mongoose = require("mongoose");

const confessionSchema = mongoose.Schema({
    Guild: String,
    ID: Number,
    Name: String,
    Confession: String,
    Time: String
});

module.exports = mongoose.model("Confession", confessionSchema);
