const { Telegraf, Markup } = require('telegraf')
const http = require('http')

const bot = new Telegraf(process.env.BOT_TOKEN)

// Главное меню с кнопками
const mainMenu = Markup.keyboard([
  ['👨‍💻 Обо мне', '📬 Контакты'],
  ['❓ Помощь']
]).resize()

// /start
bot.start((ctx) => {
  ctx.reply(
    `👋 Привет, ${ctx.from.first_name}!\n\nЯ бот-портфолио разработчика VM.\nВыбери раздел 👇`,
    mainMenu
  )
})

// Обработка кнопок
bot.hears('👨‍💻 Обо мне', (ctx) => {
  ctx.reply(
    '👨‍💻 Я — VM, fullstack разработчик\n\n' +
    '🔧 Стек: Node.js, React, Python\n' +
    '📦 Проекты: смотри в Mini App'
  )
})

bot.hears('📬 Контакты', (ctx) => {
  ctx.reply(
    '📬 Связаться со мной:\n\n' +
    'GitHub: https://github.com/vrpottot\n' +
    'TG: @tuttuto0'
  )
})

bot.hears('❓ Помощь', (ctx) => {
  ctx.reply(
    '📌 Разделы:\n\n' +
    '👨‍💻 Обо мне — информация о разработчике\n' +
    '📬 Контакты — как связаться\n' +
    '📦 Проекты — открой Mini App'
  )
})

// Если написали что-то непонятное
bot.on('text', (ctx) => {
  ctx.reply('Нажми на кнопку ниже 👇', mainMenu)
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