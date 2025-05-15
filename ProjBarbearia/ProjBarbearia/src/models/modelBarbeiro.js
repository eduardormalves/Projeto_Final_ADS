const { DataTypes, Sequelize, STRING } = require('sequelize');
const database = require('../config/db');

const Barbeiro = database.define('Barbeiro', {
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
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    especialidade: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Barbeiro;