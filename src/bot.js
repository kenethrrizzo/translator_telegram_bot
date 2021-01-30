/* Imports */
const { Telegraf } = require("telegraf");
const translate = require("@vitalets/google-translate-api");
const data = require("./config");

/* Variables and constants */
const bot = new Telegraf(data["telegram"]["token"]);
var language_to_translate = "es";
const options =
  "Options:\n/to_en -> Translate to english.\n/to_es -> Traduce al español." +
  "\nSpanish for default.";

/* bot methods */
bot.start((ctx) => {
  ctx.reply(options);
});

bot.help((ctx) => {
  ctx.reply(options);
});

bot.command("to_en", (ctx) => {
  language_to_translate = "en";
  ctx.reply("Language changed to english.");
});

bot.command("to_es", (ctx) => {
  language_to_translate = "es";
  ctx.reply("Lenguaje cambiado a español.");
});

bot.on("text", (ctx) => {
  const argument = ctx["message"]["text"];
  translate(argument, { to: language_to_translate })
    .then((res) => {
      ctx.reply(res.text);
    })
    .catch((err) => {
      console.error(err);
    });
});

bot.launch();
