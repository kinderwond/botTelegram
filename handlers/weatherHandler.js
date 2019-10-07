module.exports = bot => {
  bot.action("hourlyWeather", async ctx => {
    ctx.answerCallbackQuery("Ожидайте ;-)")
    const WEATHER_DATA = require("../controllers/weather/getCurrent")(ctx.session.town)
    weatherData = await WEATHER_DATA;
    console.log(weatherData)
    
    await ctx.reply(weatherData);
  })
  bot.action("FiveDaysWeather", async ctx => {
    ctx.answerCallbackQuery("Магия... (:")
    const WEATHER_DATA = require("../controllers/weather/get5Days")(ctx.session.town);
    weatherData = await WEATHER_DATA;
    console.log(weatherData)
    const filterWeather = require('../controllers/weather/filterWeatherData');
    let response = filterWeather.weekend(weatherData)

    for (let i in response) 
      await ctx.reply(response[i]);
  })
}