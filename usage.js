const Telegraf = require('telegraf')

var  tomatoTimer

module.exports = (bot) => {
    bot.hears('tomatos', (ctx, next) => {
        ctx.reply("Мы уведомим вас через 25 минут")
    
        tomatoTimer = setTimeout(()=> {
        ctx.session.tomatos = ctx.session.tomatos + 1 || 0;
          if (ctx.session.tomatos % 4 == 0)
            ctx.reply("Томат окончен! возьмите перерыв на 20-30 минут")
          else
            ctx.reply("Томат окончен! Возьмите отдых на 5 минут")
        },1500 )
    })
    bot.hears('statistic', (ctx, next) => {
      ctx.reply("Ваша статистика:\n" + 
        "Количество выполненых томатов = " + ctx.session.tomatos + 
        "\nУровень = " + ctx.session.level)
    })
    bot.hears('tomatoCansel', (ctx,tomatoTimer) => {
      clearTimeout(tomatoTimer)
      ctx.reply("Томат отменен")
    })

}

