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
const FiveDays_Weather = weather => {
  let sendArray = weather.map(key => {
    key['date'] = key['date'][5] + key['date'][6] +
                  key['date'][7] + key['date'][8] +
                  key['date'][9] +
                  " " +
                  key['date'][11] + key['date'][12] +
                  key['date'][13] + key['date'][14] +
                  key['date'][15]
    key['temp'] = Math.round(+key['temp'] - 273.15)

    if (description.has(key['description']))
      key['description'] = description.get(key['description'])

    return  "Время : "     +     key['date']  +
            "\nТемпература : " + key['temp']  +
            "\nОписание : "    + key['description'];
  })
  return sendArray
}

module.exports.weekend = FiveDays_Weather