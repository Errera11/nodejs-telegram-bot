const { DataTypes } = require('sequelize');
const sequelize = require('./db')
sequelize.authenticate()
sequelize.sync();

const User = sequelize.define('User', {
    chatId: {
        type: DataTypes.STRING
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    gameWins: {
        type: DataTypes.STRING
    },
    gameLoses: {
        type: DataTypes.STRING
    }
})

module.exports = User;