const { readdirSync } = require("fs");

const ascii = require("ascii-table");

let table = new ascii("Events");
table.setHeading("Events", "Load status");

module.exports = bot => {
	const events = readdirSync("./events/").filter(file => file.endsWith(".js"));

	for (const file of events) {
		const evt = require(`../events/${file}`);

		const eName = file.split(".")[0];
		bot.on(eName, evt.bind(null, bot));

				if (eName) {
						table.addRow(eName, 'Loaded!');
				} else {
						table.addRow(eName, `Missing a help.name, or help.name is not a string.`);
						continue;
				}
	}
	console.log(table.toString());

};
