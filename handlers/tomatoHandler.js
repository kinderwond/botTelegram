let tomatoTimer;
const mainMenu = require('../inline-keyboard/mainMenu.js')

module.exports = bot => {
  bot.action("runTomato", (ctx, next) => {
    ctx.answerCallbackQuery("Go go go!")
    ctx.reply("Мы уведомим вас через 25 минут");

    tomatoTimer = setTimeout(() => {
      ctx.session.tomatos = ctx.session.tomatos + 1 || 0;
      if (ctx.session.tomatos % 4 == 0)
        ctx.reply("Томат окончен! возьмите перерыв на 20-30 минут")
      else 
        ctx.reply("Томат окончен! Возьмите отдых на 5 минут")
    }, 2500000)
  })
  bot.action("statistic", ctx => {
    ctx.answerCallbackQuery("Сейчас глянем -_-")
    ctx.reply("Ваша статистика:\n" +
        "Количество выполненых томатов = " + ctx.session.tomatos +
        "\nУровень = " + ctx.session.level
    )
  })
  bot.action("canselTomato", (ctx, tomatoTimer) => {
    ctx.answerCallbackQuery("Ну ладно :(")
    clearTimeout(tomatoTimer)
    ctx.reply("Томат отменен")
  })
  bot.action("back", ctx => {
     ctx.editMessageText("Твоё меню", mainMenu)
  })
}