import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Source extends Model {
}
Source.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    apikey: {
        type: new DataTypes.STRING(256),
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
}, {
    sequelize,
    tableName: 'sources',
    modelName: 'Source',
});
