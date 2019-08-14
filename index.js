const Discord = require("discord.js");
const fs = require("fs");
const token = process.env.token
const bot = new Discord.Client({disableEveryone: true}); // Bot se defines kao bot
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/Reports',  { useNewUrlParser: true } ); //Povezivanje na Mongoose.

//Handler za komande
bot.commands = new Discord.Collection();
fs.readdir(`./commands/`, (err, folders) => {
  folders.forEach(folder => {
    fs.readdir(`./commands/${folder}`, (err, files) => {
      if(err) console.log(err);

      let jsfile = files.filter(f => f.split(".").pop() === "js")
      if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
      }
      jsfile.forEach((f, i) => {
        let props = require(`./commands/${folder}/${f}`);
        console.log(`C - ${f} loaded.`);
        bot.commands.set(props.help.name, props);
      });
    });
  });
});
//Handler za evente
bot.events = new Discord.Collection()
fs.readdir("./events/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find events.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./events/${f}`);
    console.log(`E - ${f} loaded.`);
    bot.events.set(props.help.name, props);
    bot.on(props.help.name, props.run.bind(null, bot));
  });
});
//Bot se loginuje uz pomoc tokena iz tokenfile.
bot.login(process.env.token);
