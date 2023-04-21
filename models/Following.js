const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Following extends Model { }

Following.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        follower_id: {
            type: DataTypes.INTEGER,
        },
        followee_id: {
            type: DataTypes.INTEGER,
        },
        followee_name: {
            type: DataTypes.STRING,
        },
        date_followed: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        profile_picture: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'following',
    }
);

module.exports = Following;
