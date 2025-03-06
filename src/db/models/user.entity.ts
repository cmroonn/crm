import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config.js'
import bcrypt from 'bcryptjs';
import { Employee } from './employee.entity.js';

interface IUser {
  id: number;
  username: string;
  role: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  employeeId: number;
}

export type UserCreationAttributes = Optional<IUser, 'id'>

export class User extends Model<IUser, UserCreationAttributes> {
  declare id: number;
  declare username: string;
  declare role: number;
  declare email: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare employeeId: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
    },
    email: {
      type:  DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        console.log(this.email);
        this.setDataValue('password', bcrypt.hashSync(value, 5));
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },

    employeeId: {
      type: DataTypes.INTEGER,
      references: { model: Employee, key: 'id' },
      defaultValue: null,
    }
  },

  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  }
)

console.log(User)