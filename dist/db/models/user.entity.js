import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
import bcrypt from 'bcryptjs';
import { Employee } from './employee.entity.js';
export class User extends Model {
}
User.init({
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
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
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
}, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
});
console.log(User);
