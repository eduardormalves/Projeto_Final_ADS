const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbbarber', 'postgres', '123123', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
        timestamps: false,
    },
});

module.exports = sequelize;