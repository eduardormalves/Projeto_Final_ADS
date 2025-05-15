const { DataTypes, Sequelize } = require('sequelize');
const database = require('../config/db');
const Cliente = require('./modelCliente');

const Venda = database.define('Venda', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dataVenda: {
        type: Sequelize.DATE,
        allowNull: false
    },
})

Venda.belongsTo(Cliente, {
    constraints: true,
    foreignKey: 'fkIdCliente'
})

Cliente.hasMany(Venda, {
    foreignKey: 'fkIdCliente'
})

module.exports = Venda;