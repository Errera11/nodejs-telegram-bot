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
        type: DataTypes.INTEGER, defaultValue: 0
    },
    gameLoses: {
        type: DataTypes.INTEGER, defaultValue: 0
    }
})

module.exports = User;