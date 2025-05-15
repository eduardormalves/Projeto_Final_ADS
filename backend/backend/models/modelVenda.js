const { DataTypes } = require('sequelize');
const database = require('../config/db');
const Cliente = require('./modelCliente');
const Produto = require('./modelProduto');

const Venda = database.define('Venda', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dataVenda: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

Venda.belongsTo(Cliente, {
    constraints: true,
    foreignKey: 'fkIdCliente'
})

Venda.belongsTo(Produto, {
    constraints: true,
    foreignKey: 'fkIdProduto'
})

Cliente.hasMany(Venda, {
    foreignKey: 'fkIdCliente'
})

Produto.hasMany(Venda, {
    foreignKey: 'fkIdProduto'
})


module.exports = Venda;