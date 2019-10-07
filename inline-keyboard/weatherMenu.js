const  Telegraf = require("telegraf")

const WeatherMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
      m.callbackButton('Текущая погода', 'hourlyWeather'),
      m.callbackButton('Прогноз на 5 дней', 'FiveDaysWeather'),
      m.callbackButton('Главное меню', 'back')
  ],{columns: 2}).resize())

module.exports = WeatherMenu