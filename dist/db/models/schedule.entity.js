import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
import { User } from './user.entity.js';
export class Schedule extends Model {
}
Schedule.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' },
    },
    start: {
        type: DataTypes.STRING,
    },
    end: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
    date: {
        type: DataTypes.STRING
    },
    inProgress: {
        type: DataTypes.BOOLEAN
    },
    isFinished: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize,
    tableName: 'schedule',
    modelName: 'Schedule',
});
