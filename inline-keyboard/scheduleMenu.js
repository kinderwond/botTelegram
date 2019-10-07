const  Telegraf = require("telegraf")

const WeekDays = Telegraf.Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
      m.callbackButton('Monday', 'Monday'),
      m.callbackButton('Tuesday', 'Tuesday'),
      m.callbackButton('Wednesday', 'Wednesday'),
      m.callbackButton('Thursday', 'Thursday'),
      m.callbackButton('Friday', 'Friday'),
      m.callbackButton('Saturday', 'Saturday'),
      m.callbackButton('Back', 'confirm')
  ],{columns: 2}).resize())
    
const scheduleMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.inlineKeyboard([
      m.callbackButton('Просмотр расписания', 'currentSchedule'),
      m.callbackButton('Создание/изменение расписания', 'createEditSchedule'),
      m.callbackButton('Главное меню', 'back')
  ],{columns: 1}).resize())

module.exports.weekDays = WeekDays
module.exports.scheduleMenu = scheduleMenu