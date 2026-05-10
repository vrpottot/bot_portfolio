const { Telegraf, Markup } = require('telegraf')
const http = require('http') // ← забыл добавить

const bot = new Telegraf(process.env.BOT_TOKEN) // ← токен убери из кода!

// /help
bot.help((ctx) => {
  ctx.reply(
    '📌 Доступные команды:\n\n' +
    '/start — главное меню\n' +
    '/about — обо мне\n' +
    '/contacts — контакты'
  )
})

// /about
bot.command('about', (ctx) => {
  ctx.reply(
    '👨‍💻 Я — VM, fullstack разработчик\n\n' +
    '🔧 Стек: Node.js, React, Python\n' +
    '📦 Проекты: смотри в Mini App'
  )
})

// /contacts
bot.command('contacts', (ctx) => {
  ctx.reply(
    '📬 Связаться со мной:\n\n' +
    'GitHub: github.com/vm\n' +
    'Email: vm@example.com'
  )
})

// Если написали что-то непонятное
bot.on('text', (ctx) => {
  ctx.reply('Используй /help чтобы увидеть команды 😊')
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