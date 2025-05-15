const { DataTypes } = require('sequelize');
const database = require('../config/db');

const Produto = database.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidadeEstoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco: DataTypes.DECIMAL,
})



module.exports = Produto;