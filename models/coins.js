const mongoose = require("mongoose");

const CoinsSchema = mongoose.Schema({
    Name: String,
    ID: String,
    Guild: String,
    Coins: Number
});

module.exports = mongoose.model("Coins", CoinsSchema);
