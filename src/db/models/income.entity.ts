import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config.js'
import { User } from './user.entity.js';
import { Reports } from './reports.entity.js';

interface IIncome {
  id: number;
  source: string;
  value: number;
  reportId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type IncomeCreationAttributes = Optional<IIncome, 'id'>

export class Income extends Model<IIncome, IncomeCreationAttributes> {
  declare id: number;
  declare source: string;
  declare value: number;
  declare reportId: number;
  declare createdAt: Date;
  declare updatedAt: Date;


}

Income.init(
  {
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
  },

  {
    sequelize,
    tableName: 'income',
    modelName: 'Income',
  }
)

