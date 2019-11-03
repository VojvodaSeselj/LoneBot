const { Client, Collection } = require("discord.js");
const fs = require("fs");
const token = process.env.token
const bot = new Client({disableEveryone: true}); // Bot se defines kao bot

const mongoose = require("mongoose");
const dbOptions = {
  useNewUrlParser: true,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 5,
  connectTimeoutMS: 10000,
  family: 4
};
mongoose.connect(mongodbconnect, dbOptions);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connection.on("connected", () => {
  console.log("Database - Mongoose connection successfully opened!");
});
mongoose.connection.on("err", err => {
  console.error(`Database - Mongoose connection error: \n ${err.stack}`);
});
mongoose.connection.on("disconnected", () => {
  console.log("Database - Mongoose connection disconnected");
});

//Handler za komande
bot.commands = new Collection();
bot.aliases = new Collection();
bot.events = new Collection();
["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});
//Bot se loginuje uz pomoc tokena iz tokenfile.
bot.login(token);
