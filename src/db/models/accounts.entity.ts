import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config.js'

interface IAccount {
  id: number;
  source_id: number;
  employee_id: number;
  login: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AccountCreationAttributes = Optional<IAccount, 'id'>

export class Account extends Model<IAccount, AccountCreationAttributes> {
  declare id: number;
  declare source_id: number;
  declare employee_id: number;
  declare login: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    source_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employee_id: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },

    login: {
      type: DataTypes.STRING
    },

    password:  {
      type: DataTypes.STRING
    },
  },

  {
    sequelize,
    tableName: 'accounts',
    modelName: 'Account',
  }
)

