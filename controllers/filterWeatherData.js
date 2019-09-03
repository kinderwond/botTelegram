const description = new Map([ 
		['overcast clouds',  'Пасмурно'          ],
		['light rain',       'Легкий Дождь'      ],
		['scattered clouds', 'Рассеянные облака' ],
		['few clouds',       'Малооблачно'       ],
		['clear sky',        'Чистое Небо'       ],
		['broken clouds',    'Облачно'           ]
])

const filter__Hourly__Weather = (weather_data) => {
  let todayWeather = [],
      sendArray = [], // array for send
      curent = {
        day: new Date().getDate(),
        hour: new Date().getHours()
      },
      promiseHours = {
        first: parseInt(weather_data[0]['date'][11] + weather_data[0]['date'][12]),
        secondhour: parseInt(weather_data[1]['date'][11] + weather_data[1]['date'][12])
      };

  if ((curent['hour'] >= promiseHours['first']) && 
      (curent['hour'] <= promiseHours['secondhour'])) {
    for (let key in weather_data) {
        promiseDay = parseInt(weather_data[key]['date'][8] + weather_data[key]['date'][9]);

        if (curent.day != (+promiseDay))   {
          todayWeather[key] = weather_data[key];
          todayWeather[key]['temp'] = parseInt(Math.round(todayWeather[key]['temp'] - 273.15) );
          break;
        } else {
          todayWeather[key] = weather_data[key];
          todayWeather[key]['temp'] = parseInt(Math.round(todayWeather[key]['temp'] - 273.15) );
        }
    
  
    if (description.has(weather_data[key]['description'])) 
      	weather_data[key]['description'] = description.get(weather_data[key]['description']);
    }

    for (let key in todayWeather) {
      let time =
        todayWeather[key].date[11] +
        todayWeather[key].date[12] +
        todayWeather[key].date[13] +
        todayWeather[key].date[14] +
        todayWeather[key].date[15],
      temp = +todayWeather[key]['temp'];

      sendArray[key] = "Время : " +         time +
                       "\nТемпература : " + temp +
                       "\nОписание : " +    todayWeather[key]['description'];
    }
  }
  return sendArray
};
const filter__5Days_Weather = weather_data => {
  let sendArray = [];
  for (let key in weather_data) {
    weather_data[key].date =
      weather_data[key]['date'][5] +
      weather_data[key]['date'][6] +
      weather_data[key]['date'][7] +
      weather_data[key]['date'][8] +
      weather_data[key]['date'][9] +
      " " +
      weather_data[key]['date'][11] +
      weather_data[key]['date'][12] +
      weather_data[key]['date'][13] +
      weather_data[key]['date'][14] +
      weather_data[key]['date'][15];

    weather_data[key]['temp'] = +Math.round(weather_data[key]['temp'] - 273.15);

    if (description.has(weather_data[key]['description']))
      weather_data[key]['description'] = description.get(weather_data[key]['description']);

    sendArray[key] =
      "Время : " 		 + weather_data[key]['date']  +
      "\nТемпература : " + weather_data[key]['temp']  +
      "\nОписание : " 	 + weather_data[key]['description'];
  }
  return sendArray;
};

module.exports.hourly = filter__Hourly__Weather
module.exports.weekend = filter__5Days_Weather