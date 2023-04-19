const User = require('./db/models')

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {text: '1', callback_data: 1},
                {text: '2', callback_data: 2},
                {text: '3', callback_data: 3}
            ],
            [
                {text: '4', callback_data: 4},
                {text: '5', callback_data: 5},
                {text: '6', callback_data: 6}
            ],
            [
                {text: '7', callback_data: 7},
                {text: '8', callback_data: 8},
                {text: '9', callback_data: 9}
            ],
            [{text: '10', callback_data: 10},]
        ]
    })
}

const chat = {};

module.exports = async (bot, chatId) => {
    await bot.sendMessage(chatId, `Guess the number i guessed from 1 to 10?`, gameOptions);
    bot.on('callback_query', async (event) => {
        const messId = event.message.chat.id;
        chat[messId] = Math.floor(1 + Math.random() * 10)
        const number = event.data;
        const user = await User.findOne({chatId});
        await bot.sendMessage(chatId, `You have ${user.gameWins} wins and ${user.gameLoses} loses!`);
        if(number == chat[messId].toString()) {
            user.gameWins += 1;
            bot.removeListener("callback_query");
            return await bot.sendMessage(messId, `You right! The number - ` + number);
        }
        bot.removeListener("callback_query");
        user.gameLoses += 1;
        await user.save();
        return await bot.sendMessage(messId, `You have mistaken, the number - ` + chat[messId]);
    } )
}