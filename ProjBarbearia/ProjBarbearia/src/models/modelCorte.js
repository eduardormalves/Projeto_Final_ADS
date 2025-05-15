const { DataTypes, Sequelize } = require('sequelize');
const database = require('../config/db');

const Corte = database.define('Corte', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: Sequelize.DECIMAL,
    duracao: Sequelize.TIME,
})

module.exports = Corte;