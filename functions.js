const { RichEmbed } = require("discord.js");
module.exports = {
  getMember: function(message, toFind = '') {
    toFind = toFind.toLowerCase();
    let target = message.guild.members.get(toFind);

    if (!target && message.mentions.members)
        target = message.mentions.members.first();
    if (!target && toFind) {
        target = message.guild.members.find(member => {
        return member.displayName.toLowerCase().includes(toFind) ||
        member.user.tag.toLowerCase().includes(toFind)
      });
  }

  if (!target)
  target = message.member;

  return target;
  },

  formatDate: function(date) {
    return new Intdl.DateTimeFOrmat("en-US").format(date)
  },

  promptMessage: async function(message, author, time, validReactions) {
    time *= 1000;

    for (const reaction of validReactions) await message.react(reaction);

    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

    return message
      .awaitReactions(filter, { max: 1, time: time })
      .then(colllected => colllected.first() && colllected.first().emoji.name);
  },

  findRole: (message, toFind) => {
		toFind = toFind.toLowerCase();
		const role = message.guild.roles.find((x) => x.name.toLowerCase() === toFind) || message.guild.roles.find((x) => x.name.toLowerCase().startsWith(toFind)) || message.guild.roles.get(toFind);
		return role;
	},

	errorMessage: (bot, message, error) => {
		const errorEmbed = new RichEmbed()
			.setTitle("ERROR")
			.setColor("#ff0000")
			.setDescription(error)
			.setAuthor(message.author.username, message.author.displayAvatarURL)
		message.channel.send(errorEmbed);
	}
};
