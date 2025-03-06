import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
import { Reports } from './reports.entity.js';
export class Income extends Model {
}
Income.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    source: {
        type: DataTypes.STRING,
    },
    value: {
        type: DataTypes.INTEGER,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
    reportId: {
        type: DataTypes.INTEGER,
        references: { model: Reports, key: 'id' },
    },
}, {
    sequelize,
    tableName: 'income',
    modelName: 'Income',
});
