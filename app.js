require('dotenv').config()
const Telegraf = require("telegraf")
const LocalSession = require("./sessionConfig")
const fs = require("fs")
const http = require('http')

const bot = new Telegraf("784954893:AAFVoVOtaP9q4O7JVAeZL-GLyd9TaYXpUKs")
const db = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
const server = http.createServer()

bot.use(LocalSession.middleware())
bot.use(async (ctx, next) => {
  if (ctx.session.tomatos > 50) 
    ctx.session.level = "Lover tomato";
  if (ctx.session.auth == true) {
    require("./handlers/menu.js")(bot)
    require("./handlers/tomatoHandler.js")(bot)
    require("./handlers/weatherHandler.js")(bot)
    require("./handlers/scheduleHandlerr.js")(bot)
    return next();
  } else{
    return ctx.reply("Добро пожаловать! Извините, но вы не зарегестрированы в системе!" + 
                     "По поводу регистрации обращатся к @kinderwond")
  }
});

bot.hears('/start', (ctx) => {
  let id = ctx.from.id;
  console.log(id)
  for (let key in db.sessions) {
    sessionID =  +(db.sessions[key].id.substring(0,9))
    console.log(sessionID)
    
    if (sessionID === id) {
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

