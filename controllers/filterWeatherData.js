const description = new Map([
		['overcast clouds', 'Пасмурно'],
		['light rain', 'Легкий Дождь'],
		['scattered clouds', 'Рассеянные облака'],
		['few clouds', 'Малооблачно'],
		['clear sky', 'Чистое Небо'],
		['broken clouds', 'Облачно' ]
])

const filter__Hourly__Weather = (weather_data) => {
  let todayWeather = [],
    sendArray = [], // array for send
    curent = {
      day: new Date().getDate(),
      hour: new Date().getHours()
    },
    promiseHours = {
      first: parseInt(weather_data[0].date[11] + weather_data[0].date[12]),
      next: parseInt(weather_data[1].date[11] + weather_data[1].date[12])
    };

  if (curent.hour >= promiseHours.first && curent.hour <= promiseHours.next) {
    for (let key in weather_data) {
      promiseDay = parseInt(
        weather_data[key].date[8] + weather_data[key].date[9]
      );

      if (curent.day != +promiseDay) {
        todayWeather[key] = weather_data[key];
        todayWeather[key].temp = parseInt(
          Math.round(todayWeather[key].temp - 273.15)
        );
        break;
      } else {
        todayWeather[key] = weather_data[key];
        todayWeather[key].temp = parseInt(
          Math.round(todayWeather[key].temp - 273.15)
        );
      }
    }
  }
  if (description.has(weatherData[key].description)) {
    	weatherData[key].description = description.get(weatherData[key].description);
  }
  for (let key in todayWeather) {
    let time =
        todayWeather[key].date[11] +
        todayWeather[key].date[12] +
        todayWeather[key].date[13] +
        todayWeather[key].date[14] +
        todayWeather[key].date[15],
      temp = +todayWeather[key].temp;

    sendArray[key] = "Время : " + time +
                     "\nТемпература : " + temp +
                     "\nОписание : " + todayWeather[key].description;
  }
  return sendArray
};
const filter__5Days_Weather = weather_data => {
  let sendArray = [];
  for (let key in weatherData) {
    weatherData[key].date =
      weatherData[key].date[5] +
      weatherData[key].date[6] +
      weatherData[key].date[7] +
      weatherData[key].date[8] +
      weatherData[key].date[9] +
      " " +
      weatherData[key].date[11] +
      weatherData[key].date[12] +
      weatherData[key].date[13] +
      weatherData[key].date[14] +
      weatherData[key].date[15];
    weatherData[key].temp = +Math.round(weatherData[key].temp - 273.15);
    if (description.has(weatherData[key].description))
      weatherData[key].description = description.get(
        weatherData[key].description
      );
    sendArray[key] =
      "Время : " 		 + weatherData[key].date  +
      "\nТемпература : " + weatherData[key].temp  +
      "\nОписание : " 	 + weatherData[key].description;
  }
  return sendArray;
};

module.exports.hourly = filter__Hourly__Weather
module.exports.weekend = filter__5Days_Weather