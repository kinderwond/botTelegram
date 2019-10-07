const  Telegraf = require("telegraf")

const MainMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
      m.callbackButton('tomatos', 'tomatos'),
      m.callbackButton('Schedule', 'schedule'),
      m.callbackButton('weather', 'weather')
  ]).resize())

module.exports = MainMenu