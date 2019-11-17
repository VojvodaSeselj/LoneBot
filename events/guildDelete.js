const Guild = require("../models/guild");

module.exports = (bot, guild) => {
		Guild.findOne({
			Guild: guild.id,
		});
		if (Guild) {
			Guild.deleteOne({ Guild: guild.id }, (err) => {
			if(err) console.log(err);
		});
	}
};
