const { DataTypes, Sequelize } = require('sequelize');
const database = require('../config/db');
const Barbeiro = require('./modelBarbeiro');
const Cliente = require('./modelCliente');
const Corte = require('./modelCorte');

//Adicionar as FK

const Agendamento = database.define('Agendamento', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dataHora: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Agendamento.belongsTo(Cliente, {
    constraints: true,
    foreignKey: 'fkIdCliente'
})

Agendamento.belongsTo(Barbeiro, {
    constraints: true,
    foreignKey: 'fkIdBarbeiro'
})

Agendamento.belongsTo(Corte, {
    constraints: true,
    foreignKey: 'fkIdCorte'
})

Cliente.hasMany(Agendamento, {
    foreignKey: 'fkIdCliente'
})

module.exports = Agendamento;