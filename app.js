
const Telegraf = require("telegraf")
const LocalSession = require("./sessionConfig")
const fs = require("fs")
const http = require('http')

const bot = new Telegraf("784954893:AAEAtfBTG8v2XQG8LNvT1eDssLH3_j0SLF0")
const users = JSON.parse(fs.readFileSync("./db/usersId.json", "utf-8"))
const server = http.createServer()

bot.use(LocalSession.middleware());
bot.use(async (ctx, next) => {
  if (ctx.session.tomatos > 50) 
    ctx.session.level = "Lover tomato";
  if (ctx.session.auth == true) {
    require("./handlers/menu.js")(bot)
    require("./handlers/tomatoHandler.js")(bot)
    require("./handlers/weatherHandler.js")(bot)
    require("./handlers/scheduleHandlerr.js")(bot)
    return next();
  } else
    return ctx.reply("Добро пожаловать! Извините, но вы не зарегестрированы в системе!" + 
                     "По поводу регистрации обракщатся к @kinderwond");
});

bot.hears('/start', ctx => {
  let id = ctx.from.id;
  for (let key in users.usersID) {
    if (users.usersID[key] === id) {
      ctx.session.auth = true;
      ctx.reply('Авторизация прошла успешно')
      return ctx.session.auth;
    }
    else ctx.session.auth = false;
  }

  return ctx.session.auth;
});

bot.launch();
server.listen(process.env.PORT)

