const mongoose = require("mongoose");

const shopSchema = mongoose.Schema({
    Guild: String,
    Items: Array,
});

module.exports = mongoose.model("Shop", shopSchema);
