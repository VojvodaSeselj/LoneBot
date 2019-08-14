const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
    Guild: String,
    ReportedUser: {
      Username: String,
      ID: String,
    },
    ReportedBy: {
      Username: String,
      ID: String,
    },
    Reason: String,
    Time: String
});

module.exports = mongoose.model("Report", reportSchema);
