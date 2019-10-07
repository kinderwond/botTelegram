const mainMenu = require("../inline-keyboard/mainMenu")
const weatherMenu = require("../inline-keyboard/weatherMenu")
const tomatosMenu = require("../inline-keyboard/tomatos")
const scheduleMenu = require("../inline-keyboard/scheduleMenu")

module.exports = bot => {
  bot.hears('menu',  ctx => ctx.reply('Ваше меню', mainMenu) )
  bot.action('weather', ctx => {
    ctx.answerCallbackQuery()
    ctx.editMessageText('Прогноз погоды', weatherMenu) 
  })
  bot.action('tomatos', ctx => {
    ctx.answerCallbackQuery()
    ctx.editMessageText('Ваше меню для метода "Томат"', tomatosMenu) 
  })
  bot.action('schedule', ctx => {
    ctx.answerCallbackQuery()
    ctx.editMessageText('Ваше меню для расписания', scheduleMenu.scheduleMenu) 
  })
}