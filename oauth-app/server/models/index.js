const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true, // bo użytkownik Google może nie mieć emaila w bazie
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true, // bo użytkownik Google nie ma hasła
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = { sequelize, User };
