const  Telegraf = require("telegraf")

const Tomatos = Telegraf.Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
      m.callbackButton('Запуск томата', 'runTomato'),
      m.callbackButton('Отмена томата', 'canselTomato'),
      m.callbackButton('Моя статистика', 'statistic'),
      m.callbackButton('Главное меню', 'back')
  ],{columns: 2}).resize())

module.exports = Tomatos