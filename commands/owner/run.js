const { RichEmbed } = require("discord.js");

module.exports = {
    name: "run",
    aliases: ["exec", "eval"],
    category: "Owner",
    description: "Use this command to run a code!",
    usage: "Run <Code>",
    example: "Run console.log(\"Hello World\")",
    cooldown: 5,
    run: async (bot, message, args) => {
		if(args[0] === "command") {
			const cmd = this.bot.commands.get(args[1]);
			if(!cmd) return message.reply("Command not found!");
			args = args.slice(2);
			try{
				return cmd.run(message, args);
			}
			catch(e) {
				message.channel.send(`${e.name}: ${e.message}`);
			}
		}
		else{
			let embed;
			try{
				const codein = args.join(" ");
				let code = await eval(codein);
				const ctype = typeof code;
				if (typeof code !== "string") {
					code = require("util").inspect(code, {
						depth: 0,
					});
				}
				embed = new RichEmbed()
					.setTitle("Evaluation")
					.addField("Input", `\`\`\`js\n${codein}\`\`\``)
					.addField("Output", `\`\`\`js\n${code}\`\`\``)
					.addField("Type", `\`\`\`js\n${ctype}\`\`\``);
			}
			catch(e) {
				embed = new RichEmbed()
					.setTitle("Error")
					.setColor("#ff0000")
					.addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
					.addField("Error", `\`\`\`js\n${e.name}: ${e.message}\`\`\``);
			}
			message.channel.send(embed);
		}
	}
};
