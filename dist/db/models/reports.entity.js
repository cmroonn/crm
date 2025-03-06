import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
import { User } from './user.entity.js';
import { Schedule } from './schedule.entity.js';
export class Reports extends Model {
}
Reports.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' },
    },
    startTime: {
        type: DataTypes.STRING,
    },
    endTime: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
    shiftId: {
        type: DataTypes.STRING,
        references: { model: Schedule, key: 'id' },
    },
}, {
    sequelize,
    tableName: 'reports',
    modelName: 'Reports',
});
