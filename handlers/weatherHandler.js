module.exports = bot =>{
  bot.action("hourlyWeather", async ctx => {
    ctx.answerCallbackQuery("Ожидайте ;-)")
    const WEATHER_DATA = require("../controllers/weather/getCurrent")(ctx.session.town)
    weatherData = await WEATHER_DATA;
    
    await ctx.reply(weatherData);
  })
  bot.action("FiveDaysWeather", async ctx => {
    ctx.answerCallbackQuery("Магия... (:")
    const getWeather = require("../controllers/weather/get5Days")(ctx.session.town)
    weatherData = await getWeather;

    const filterWeather = require('../controllers/weather/filterWeatherData')(weatherData)

    let response = ""
    for (let i = 1; i < filterWeather.length; i++) {
      const prevDay = parseInt(filterWeather[i-1]['date'][3] + filterWeather[i-1]['date'][4])
      const currentDay = +(filterWeather[i]['date'][3] + filterWeather[i]['date'][4])
      
      if (prevDay == currentDay) 
        response += "Дата: " + filterWeather[i]['date'] + "\n" + 
                    "Температура = " + filterWeather[i]['temp'] + "\n" +
                    "Описание: " + filterWeather[i]['description'] + "\n"
      else {
          await ctx.reply(response)
          response = ""
        }
    }
  })
}