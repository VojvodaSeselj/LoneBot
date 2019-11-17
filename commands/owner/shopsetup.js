const { RichEmbed } = require("discord.js");
const { findRole } = require("../../functions.js");
const { stripIndents } = require("common-tags");
const Shop = require("../../models/shop.js")

module.exports = {
    name: "shopsetup",
    aliases: ["ss"],
    category: "Owner",
    description: "Set up shop for your discord server.",
    usage: "ShopSetUp",
    example: "ShopSetUp AddItem Book",
    cooldown: 5,
    run: async (bot, message, args) => {
      let guildid = message.guild.id;
      let shop = await Shop.findOne({ Guild: guildid })
      if (message.deletable) message.delete()

      if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.reply("You do not have required permission to use this command!").then(m => m.delete(5000));
      }

      const embed = new RichEmbed()
          .setColor("#ff8c00")
          .setThumbnail(message.member.tag, message.member.displayAvatarURL)
          .setFooter(message.member.displayName, message.author.displayAvatarURL)
          .setDescription(stripIndents`**Setup**

          **AddRole**
          To add role to shop items.

          **RemoveRole**
          To remove role from shop items.`);

  		const toSetup = args[0];
      if(!["addrole", "removerole"].includes(args[0])) return message.channel.send(embed);

      if(toSetup === "addrole") {
          if (!args[1]) return message.reply("You need to supply name of the item!");
          if (!args[2]) return message.reply("You need to supply price for that item!");
          let name = args[1];
          let price = parseInt(args[2]);
          if (price <= 0) return message.reply("Price must be above 0!");
          let role = message.guild.roles.find(role => role.name === name);
          if (!role) return message.reply("That role couldn't be found!");
          if(shop.Items.find((x) => x.Name === name)) return message.reply("That item is already added!");
          shop.Items.push({ Name: name, Price: price })
          shop.save().catch(console.error);
          message.reply(`Successfully added ${name} to items!`);
    } else if (toSetup === "removerole") {
          if (!args[1]) return message.reply("You need to supply name of the item!");
          let name = args[1];
          if(!shop.Items.find((x) => x.Name === name)) return message.reply("That item is does not exist!");
          shop.Items.splice(shop.Items.findIndex((x) => x.Name === name), 1);
          shop.save().catch(console.error);
          message.reply(`Successfully removed ${name} from items!`);
    }
  }
}
