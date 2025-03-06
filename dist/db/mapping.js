import sequelize from './config.js';
import database from 'sequelize';
const { DataTypes } = database;
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
    username: { type: DataTypes.STRING, unique: true },
});
const Sources = sequelize.define('sources', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
});
export { User, Sources, };
