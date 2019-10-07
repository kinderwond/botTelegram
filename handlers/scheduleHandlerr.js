const Stage = require('telegraf/stage')
const scheduleMenu = require('../inline-keyboard/scheduleMenu.js')
const ScheduleScene = require('../scenes/editMenu')
const editSchedule = new Stage([ScheduleScene])	

const days = new Map([
	["monday",    "Понедельник"],
	["tuesday",   "Вторник"	   ],
	["wednesday", "Среда"	   ],
	["thursday",  "Четверг"	   ],
	["friday", 	  "Пятница"	   ],
	["saturday",  "Суббота"	   ]
])

module.exports = bot => {
	bot.use(editSchedule.middleware());
	bot.action('createEditSchedule', async (ctx) => {
  		ctx.answerCallbackQuery(' ')
  		await ctx.editMessageText("1 - Выбери день недели\n" + 
  			  					  "2 - Введи мне расписание(строго на русском) в формате:\n" +
  								  "10:00 - Математика;\n12:00 - Биология;\nит.д.\n" +
                      			  "3 - Отправь мне расписание\n", scheduleMenu.weekDays)  
  		ctx.scene.enter("createSchedule")
	})
	bot.action('currentSchedule', async (ctx) => {
		ctx.answerCallbackQuery(' ')
		let request = ""
		for (let key in ctx.session) 
			if (days.has(key)) 
        		request += days.get(key) + "\n" + ctx.session[key]
		ctx.reply("Ваше расписание:\n" + request)
	})
}