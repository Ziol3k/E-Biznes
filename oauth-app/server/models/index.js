const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
});

module.exports = { sequelize, User };
