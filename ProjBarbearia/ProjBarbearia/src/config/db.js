const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbbarber', 'postgres', '123123123', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});

module.exports = sequelize;