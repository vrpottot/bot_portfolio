const { Telegraf, Markup } = require('telegraf')

const bot = new Telegraf('8385890879:AAEwDmcd-97AN_Hp2G9CO3UUOhaE26IGL2s') // токен из BotFather

// Кнопка открытия Mini App
const miniAppButton = Markup.keyboard([
  [Markup.button.webApp('🚀 Открыть портфолио', 't.me/VMportfolio_bot/devfolio.')]
]).resize()

// /startt.me/VMportfolio_bot/devfolio.
bot.start((ctx) => {
  ctx.reply(
    `👋 Привет, ${ctx.from.first_name}!\n\nЯ бот-портфолио разработчика VM.\nНажми кнопку ниже, чтобы посмотреть проекты 👇`,
    miniAppButton
  )
})

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

bot.launch()
console.log('Бот запущен!')

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))