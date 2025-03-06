import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config.js'

interface IEmployee {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type EmployeeCreationAttributes = Optional<IEmployee, 'id'>

export class Employee extends Model<IEmployee, EmployeeCreationAttributes> {
  declare id: number;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  },

  {
    sequelize,
    tableName: 'employee',
    modelName: 'Source',
  }
)

