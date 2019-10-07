const axios = require("axios")
const description = new Map([ 
    ["light rain", 'Легкий Дождь'],
    ["moderate rain", 'умеренный дождь'],
    ['light intensity shower rain', 'Легкий интенсивный дождь'],
    ["overcast clouds", 'Пасмурно'],
    ["scattered clouds", 'Рассеянные облака'],
    ["few clouds", 'Малооблачно'],
    ["clear sky", 'Чистое Небо'],
    ["broken clouds", 'Облачно'],
    ["light intensity drizzle", 'моросящий свет']
])

module.exports = town => {
  return new Promise((resolve, reject) => {
    axios({
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + town + "&appid=a6dbb945a94c4b5240c048de757cdf0b&mode=json",
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
      responseType: "json"
    }).then(res => {
      let json = res.data;
      console.log(json.weather[0].description)
      const weatherData = {        
        temp: Math.round(json.main.temp - 273.15),
        description: description.get(json.weather[0].description)
      }
      resolve(weatherData);
    });
  });
};
