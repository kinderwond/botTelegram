const Telegraf = require("telegraf")
const session = require('telegraf/session')
const Scene = require('telegraf/scenes/base')
const scheduleMenu = require('../inline-keyboard/scheduleMenu')
const validation = require('../controllers/validation')

let dayWeek = "", permission = false

const createSchedule = new Scene('createSchedule' )
createSchedule.action(/Monday|Tuesday|Wednesday|Thursday|Friday|Saturday/, async (ctx) => {
	ctx.answerCallbackQuery("Напиши расписание и отправь мне")	
    dayWeek =  ctx.match[0].toLowerCase()    
    permission = true
})
createSchedule.on('message', async (ctx) => {
  if (permission == true) {
    ctx.session[dayWeek] = validation(ctx.message.text)  
    permission = false
    ctx.reply("Расписание на " + dayWeek + " успешно сохранено")  
  }
})  
createSchedule.action("confirm", async (ctx) => {
  await ctx.editMessageText("Твоё меню", scheduleMenu.scheduleMenu)
  await ctx.answerCallbackQuery("Расписание успешно сохранено!")
  await ctx.scene.leave()
})

module.exports = createSchedule


