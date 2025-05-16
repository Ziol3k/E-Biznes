const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    googleAccessToken: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    googleRefreshToken: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    githubId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    githubAccessToken: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    githubRefreshToken: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = { sequelize, User };