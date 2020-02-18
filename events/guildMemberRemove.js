const User = require("../models/user.js");
const Guild = require("../models/guild.js");

module.exports = async (bot, member) => {
  if (!member.guild.available) return;
  if (!member || !member.id || !member.guild) return;
  let user = await User.findOne({
    Guild: member.guild.id,
    ID: member.user.id
  });
  if (user) {
    User.deleteOne({ Guild: member.guild.id, ID: member.user.id }, (err) => {
  		if(err) console.log(err);
  	});
  }
  let guild = await Guild.findOne({ Guild: member.guild.id });
  if (!guild) {
    guild = new Guild({
      Guild: member.guild.id,
      AdminRole: "",
      ModeratorRole: "",
      Prefix: "sk!",
      Nsfw: false,
      Xp: true,
      Verify: {
        Enabled: false,
        VerifyRole: "",
        VerifiedRole: "",
        Channel: "",
        LogsChannel: "",
      },
      Welcome: {
        Enabled: false,
        Channel: "",
        Message: "",
      },
      Leave: {
        Enabled: false,
        Channel: "",
        Message: "",
      },
      AutoRoles: {
        Enabled: false,
        Roles: [],
      },
      LogsChannel: ""
    });
  }
  guild.save().catch(err => console.log(err));

	if(!guild.Leave.Enabled && guild.Leave.Enabled === false) return;
	if(!guild.Leave.Message && guild.Leave.Message.length < 1) return;
	if(!guild.Leave.Channel && guild.Leave.Channel.length < 1) return;
	const placeHolders = {
		"memberCount": member.guild.memberCount,
    "serverName": member.guild.name,
		"userTag": member.user.tag,
	};
	const leaveMessage = guild.Leave.Message.replace(/{(memberCount|serverName|userTag)}/gi, m => placeHolders[m.slice(1, -1)]);
  const leaveChannel = member.guild.channels.find(channel => channel.name === guild.Leave.Channel);
	if(!leaveChannel) return;
	leaveChannel.send(leaveMessage).catch(err => console.log(err));
}
