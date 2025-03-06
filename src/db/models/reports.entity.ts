import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config.js'
import { User } from './user.entity.js';
import { Schedule } from './schedule.entity.js';

interface IReports {
  id: number;
  startTime: string;
  endTime: string;
  shiftId: number;
  createdAt: Date;
  updatedAt: Date;
  user_id: number;
}

export type ReportsCreationAttributes = Optional<IReports, 'id'>

export class Reports extends Model<IReports, ReportsCreationAttributes> {
  declare id: number;
  declare startTime: string;
  declare endTime: string;
  declare shiftId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare user_id: number;

}

Reports.init(
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
  },

  {
    sequelize,
    tableName: 'reports',
    modelName: 'Reports',
  }
)

