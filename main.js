require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api')
const guessTheNumberGame = require("./guessTheNumberGame");
const User = require('./db/models');

const bot = new TelegramBot(process.env.token,
    {polling: true})


const start = () => {
    try {
        bot.on('message', async (event) => {
            const chatId = event.chat.id;
            const message = event.text;
            const messageType = event.text;
            switch(messageType) {
                case('/start'):
                    const user = await User.findOne({chatId})
                    if(!user) await User.create({chatId})
                    return await bot.sendMessage(chatId, `Hello ${event.from.first_name}`)
                case('/help'):
                    return await bot.sendMessage(chatId, 'template')
                case('/game'):
                    return await guessTheNumberGame(bot, chatId);
                default:
                    return await bot.sendMessage(chatId, 'I dont understand you!')
            }


        })
    } catch(e) {
        console.log(e);
    }

}

start()