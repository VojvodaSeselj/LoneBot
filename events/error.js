module.exports = async (bot, error) => {
  bot.channels.get("624661998646460416").send(error.name + ":" + error.stack);
  console.log(error);
}
