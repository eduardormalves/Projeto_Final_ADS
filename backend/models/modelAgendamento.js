const { DataTypes } = require('sequelize');
const database = require('../config/db');
const Barbeiro = require('./modelBarbeiro');
const Cliente = require('./modelCliente');

//Adicionar as FK

const Agendamento = database.define('Agendamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dataHora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
})

Agendamento.belongsTo(Barbeiro, {
    constraints: true,
    foreignKey: 'fkIdBarbeiro'
})

Agendamento.belongsTo(Cliente, {
    constraints: true,
    foreignKey: 'fkIdCliente'
})

module.exports = Agendamento;