const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    phone: {
        type: Sequelize.INTEGER,
        unique: true

    }
});

module.exports = User;