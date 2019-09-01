const Telegraf = require("telegraf"),
  WeatherDescription = {
    "scattered clouds": "рассеяные облака",
    "broken clouds": "облачно",
    "overcast clouds": "пасмурно"
  };

let tomatoTimer;

module.exports = bot => {
  bot.hears("/томат", (ctx, next) => {
    ctx.reply("Мы уведомим вас через 25 минут");

    tomatoTimer = setTimeout(() => {
      ctx.session.tomatos = ctx.session.tomatos + 1 || 0;
      if (ctx.session.tomatos % 4 == 0)
        ctx.reply("Томат окончен! возьмите перерыв на 20-30 минут");
      else ctx.reply("Томат окончен! Возьмите отдых на 5 минут");
    }, 1500);
  });
  bot.hears("/статистика", (ctx, next) => {
    ctx.reply(
      "Ваша статистика:\n" +
        "Количество выполненых томатов = " +
        ctx.session.tomatos +
        "\nУровень = " +
        ctx.session.level
    );
  });
  bot.hears("/отмена томата", (ctx, tomatoTimer) => {
    clearTimeout(tomatoTimer);
    ctx.reply("Томат отменен");
  });
  bot.hears("погода сегодня", async ctx => {
    const WEATHER_DATA = require("./getWeather")(ctx.session.town);
    weatherData = await WEATHER_DATA;

    const filterWeather = require('./filterWeatherData');
    let response = filterWeather.hourly(weatherData)

    for (let i in response) 
      await ctx.reply(response[i]);
  });
  bot.hears("погода на 5 дней", async ctx => {
    const WEATHER_DATA = require("./getWeather")(ctx.session.town);
    weatherData = await WEATHER_DATA;

    const filterWeather = require('./filterWeatherData');
    let response = filterWeather.weekend(weatherData)

    for (let i in response) 
      await ctx.reply(response[i]);
  });
};
