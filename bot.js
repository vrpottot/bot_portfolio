const { Telegraf, Markup } = require('telegraf')
const http = require('http')

const bot = new Telegraf(process.env.BOT_TOKEN)

// /start
bot.start((ctx) => {
  ctx.reply(
    `👋 Привет, ${ctx.from.first_name}!\n\nЯ бот-портфолио разработчика VM.\nВыбери раздел 👇`,
    Markup.inlineKeyboard([
      [Markup.button.callback('👨‍💻 Обо мне', 'about')],
      [Markup.button.callback('📬 Контакты', 'contacts')],
      [Markup.button.callback('❓ Помощь', 'help')]
    ])
  )
})

// Обработка инлайн кнопок
bot.action('about', (ctx) => {
  ctx.answerCbQuery()
  ctx.reply(
    '👨‍💻 Я — VM, fullstack разработчик\n\n' +
    '🔧 Стек: Node.js, React, Python\n' +
    '📦 Проекты: смотри в Mini App'
  )
})

bot.action('contacts', (ctx) => {
  ctx.answerCbQuery()
  ctx.reply(
    '📬 Связаться со мной:\n\n' +
    'GitHub: https://github.com/vrpottot\n' +
    'TG: @tuttuto0'
  )
})

bot.action('help', (ctx) => {
  ctx.answerCbQuery()
  ctx.reply(
    '📌 Разделы:\n\n' +
    '👨‍💻 Обо мне — информация о разработчике\n' +
    '📬 Контакты — как связаться\n' +
    '📦 Проекты — открой Mini App'
  )
})

// Если написали что-то непонятное
bot.on('text', (ctx) => {
  ctx.reply(
    'Выбери раздел 👇',
    Markup.inlineKeyboard([
      [Markup.button.callback('👨‍💻 Обо мне', 'about')],
      [Markup.button.callback('📬 Контакты', 'contacts')],
      [Markup.button.callback('❓ Помощь', 'help')]
    ])
  )
})

// HTTP сервер для Render
const PORT = process.env.PORT || 3000
http.createServer((req, res) => res.end('Bot is running')).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

bot.launch()
console.log('Бот запущен!')

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))