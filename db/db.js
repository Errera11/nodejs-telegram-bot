const {Sequelize} = require('sequelize');


const sequelize = new Sequelize(
    process.env.dbName,
    process.env.dbUsername,
    process.env.dbPassword,
    {
        dialect: 'postgres',
        host: process.env.dbHost,
        port: process.env.dbPort
    });


module.exports = sequelize;


