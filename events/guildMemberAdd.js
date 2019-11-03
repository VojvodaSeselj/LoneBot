const mongoose = require("mongoose");
const User = require("../models/user.js");
const Guild = require("../models/guild.js");

module.exports = async (bot, member) => {
  //Kada udje novi member dodeljuje mu role i salje welcome poruku.
	const guild = await Guild.findOne({ Guild: member.guild.id });
	if(guild.AutoRoles.Roles.length !== 0) {
		for(const role of guild.AutoRoles.Roles) {
			member.addRole(role).catch(err => console.log(err));
		}
	}
  let user = await User.findOne({
    Guild: member.guild.id,
    ID: member.user.id
  });
  if (!user) {
    user = new User({
      Guild: member.guild.id,
      Username: member.user.username,
      ID: member.user.id,
      XP: 0,
      Level: 1,
      Cash: 0,
      Bank: 1000,
      Joined: member.joinedAt
    });
  }
  user.save().catch(err => console.log(err));

	if(guild.Welcome.Enabled === false) return;
	if(guild.Welcome.Message === "" || guild.Welcome.Message.length < 1) return;
	if(guild.Welcome.Channel === "") return;
	const placeHolders = {
		"memberCount": member.guild.memberCount,
		"botCount": member.guild.members.filter(x => x.user.bot).size,
		"serverName": member.guild.name,
		"userName": member.user.username,
		"userMention": member.user.toString(),
		"userTag": member.user.tag,
	};
	const welcomeMessage = guild.Welcome.Message.replace(/{(memberCount|botCount|serverName|userName|userMention|userTag)}/gi, m => placeHolders[m.slice(1, -1)]);
	const welcomeChannel = member.guild.channels.find(channel => channel.name === guild.Welcome.Channel);
	if(!welcomeChannel) return;
	welcomeChannel.send(welcomeMessage).catch(err => console.log(err));

  if (guild.Verify.Enabled === "true" && guild.Verify.VerifyRole !== "" && guild.Verify.VerifiedRole !== "" && guild.Verify.Channel !== "" && guild.Veify.LogsChannel !== "") {
  let ruser = member;
  let verifyrole = member.guild.roles.find(role => role.name === guild.Verify.VerifyRole);
  if (!ruser.roles.has(verifyrole.id)) {
      await(ruser.addRole(verifyrole.id));
    }
  }
}
