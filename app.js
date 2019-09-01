const Telegraf = require("telegraf"),
  LocalSession = require("telegraf-session-local"),
  fs = require("fs"),
  http = require('http'),
  bot = new Telegraf("784954893:AAF0xfGRdEHZ2cNuUsb5IYcA7M_6uGoLkm8"),
  users = JSON.parse(fs.readFileSync("./db/usersId.json", "utf-8"));

let id = 0;
https.createServer()
const property = "data",
  localSession = new LocalSession({
    database: "./db/db.json",
    property: "session",
    storage: LocalSession.storageFileAsync,
    format: {
      serialize: obj => JSON.stringify(obj, null, "\t"),
      deserialize: str => JSON.parse(str)
    }
  });

bot.use(localSession.middleware());
bot.use(async (ctx, next) => {
  if (ctx.session.tomatos > 50) ctx.session.level = "Lover tomato";

  if (ctx.session.auth == true) {
    let x = require("./controllers/usage.js")(bot);
    return next();
  } else
    return ctx.reply(
      "Добро пожаловать! Извините, но вы не зарегестрированы в системе! По поводу регистрации обракщатся к @kinderwond " +
        ctx.from.id
    );
});

bot.start((ctx, next) => {
  id = ctx.from.id;
  for (let key in users) {
    if (users[key].id == id) {
      ctx.session.auth = true;
      return ctx.session.auth;
    }
  }
  ctx.session.auth = false;
  return ctx.session.auth;
});

bot.launch();
http.listen(5000)