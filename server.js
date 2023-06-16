const SMTPServer = require("smtp-server").SMTPServer
const MailParser = require('mailparser').MailParser
const TelegramBot = require('node-telegram-bot-api')
let parser = new MailParser()
bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: true
})

const USERNAME = process.env.SMTP_USERNAME || 'test'
const PASSWORD = process.env.SMTP_PASSWORD || 'test'

const server = new SMTPServer({
    banner: 'smtp2tg',
    logger: false,
    allowInsecureAuth: true,
    onAuth(auth, session, callback) {
        console.log('auth request')
        if (auth.username !== USERNAME || auth.password !== PASSWORD) {
            return callback(new Error("Invalid username or password"))
        }
        callback(null, {user: 123})
    },
    onData(stream, session, callback) {
        const parser = new MailParser()
        stream.pipe(parser); // print message to console
        let subject = ''
        parser.on('headers', headers => {
            subject = headers.get('subject')
        })
        parser.on('data', data => {
            const text = data.text || ''
            bot.sendMessage(process.env.CHAT_ID, `${subject}\n\n${text}`)
            callback()
        })
    }
})

server.listen(2525)

process.on('SIGTERM', () => {
    server.close()
})