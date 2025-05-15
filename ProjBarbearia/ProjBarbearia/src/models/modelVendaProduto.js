const { DataTypes, Sequelize } = require('sequelize');
const database = require('../config/db');

const Produto = database.define('Produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade_estoque: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descricao: Sequelize.STRING,
    precO: Sequelize.DECIMAL,
})

module.exports = Produto;