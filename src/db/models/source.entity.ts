import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config.js'

interface ISource {
  id: number;
  name: string;
  apikey: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SourceCreationAttributes = Optional<ISource, 'id'>

export class Source extends Model<ISource, SourceCreationAttributes> {
  declare id: number;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Source.init(
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
    apikey: {
      type: new DataTypes.STRING(256),
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },

  {
    sequelize,
    tableName: 'sources',
    modelName: 'Source',
  }
)

