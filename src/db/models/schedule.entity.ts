import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config.js'
import { User } from './user.entity.js';

interface ISchedule {
  id: number;
  start: string;
  end: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: Date;
  isFinished: Boolean;
  inProgress: Boolean;
}

export type ScheduleCreationAttributes = Optional<ISchedule, 'id'>

export class Schedule extends Model<ISchedule, ScheduleCreationAttributes> {
  declare id: number;
  declare start: string;
  declare end: string;
  declare date: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare user_id: Date;
  declare isFinished: Boolean;
  declare inProgress: Boolean;
}

Schedule.init(
  {
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
  },

  {
    sequelize,
    tableName: 'schedule',
    modelName: 'Schedule',
  }
)

