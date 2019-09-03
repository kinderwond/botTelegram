const Telegraf = require("telegraf")
let tomatoTimer;

module.exports = bot => {
  bot.action("runTomat", (ctx, next) => {
    ctx.answerCallbackQuery("Go go go!")
    ctx.reply("Мы уведомим вас через 25 минут");

    tomatoTimer = setTimeout(() => {
      ctx.session.tomatos = ctx.session.tomatos + 1 || 0;
      if (ctx.session.tomatos % 4 == 0)
        ctx.reply("Томат окончен! возьмите перерыв на 20-30 минут");
      else ctx.reply("Томат окончен! Возьмите отдых на 5 минут");
    }, 1500000);
  });
  bot.action("statistic", (ctx, next) => {
    ctx.answerCallbackQuery("Сейчас глянем -_-")
    ctx.reply(
      "Ваша статистика:\n" +
        "Количество выполненых томатов = " +
        ctx.session.tomatos +
        "\nУровень = " +
        ctx.session.level
    );
  });
  bot.action("canselTomat", (ctx, tomatoTimer) => {
    ctx.answerCallbackQuery("На ладно :(")
    clearTimeout(tomatoTimer);
    ctx.reply("Томат отменен");
  });
  bot.action("hourlyWeather", async ctx => {
    ctx.answerCallbackQuery("Ожидайте ;-)")
    const WEATHER_DATA = require("./getWeather")(ctx.session.town);
    weatherData = await WEATHER_DATA;

    const filterWeather = require('./filterWeatherData');
    let response = filterWeather.hourly(weatherData)

    for (let i in response) 
      await ctx.reply(response[i]);
  });
  bot.action("weather5Days", async ctx => {
    ctx.answerCallbackQuery("Магия... (:")
    const WEATHER_DATA = require("./getWeather")(ctx.session.town);
    weatherData = await WEATHER_DATA;

    const filterWeather = require('./filterWeatherData');
    let response = filterWeather.weekend(weatherData)

    for (let i in response) 
      await ctx.reply(response[i]);
  });

  const Menu = Telegraf.Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
      m.callbackButton('Продуктивность', 'tomatos'),
      m.callbackButton('Погода', 'weather')
  ]))
  const Weather = Telegraf.Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
          m.callbackButton('Прогноз на сегодня', 'hourlyWeather'),
          m.callbackButton('Прогноз на 5 дней', 'weather5Days'),
          m.callbackButton('Назад', 'back')
          ])
    .resize()) 
  const Tomatos = Telegraf.Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
      m.callbackButton('Запуск томата', 'runTomat'),
      m.callbackButton('Отмена томата', 'canselTomat'),
      m.callbackButton('Статистика', 'statistic'),
      m.callbackButton('Назад', 'back')
     ])
    .resize())  

  bot.hears('menu',  ctx => ctx.reply('Ваше меню', Menu) )
  bot.action('weather', ctx => {
    ctx.answerCallbackQuery()
    ctx.editMessageText('Прогноз погоды', Weather) 
  })
  bot.action('tomatos', ctx => {
    ctx.answerCallbackQuery()
    ctx.editMessageText('Метод томатов', Tomatos) 
  })
  bot.action('back',   ctx => {
    ctx.answerCallbackQuery()
    ctx.editMessageText('Ваше меню',Menu) 
  })
  bot.on('message', ctx => ctx.reply("Ваше меню", Menu))
}