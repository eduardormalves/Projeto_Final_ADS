const { DataTypes } = require('sequelize');
const database = require('../config/db');

const Corte = database.define('Corte', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: DataTypes.DECIMAL,
})

module.exports = Corte;