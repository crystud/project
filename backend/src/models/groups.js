import { Model, DataTypes } from 'sequelize'
import Specialty from './specialty'
import sequelize from '../database'

class Groups extends Model {}
Groups.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  entry: DataTypes.DATE,
  graduation: DataTypes.DATE,
  specialtyID: {
    type: DataTypes.INTEGER,
    references: {
      model: Specialty,
      key: 'id',
    },
  },
  number: DataTypes.INTEGER,
},
{
  sequelize,
  modelName: 'groups',
})

Groups.belongsTo(Specialty, {
  foreignKey: 'specialtyID',
  as: 'specialty',
})

Specialty.hasMany(Groups, {
  foreignKey: 'specialtyID',
  as: 'groups',
})

export default Groups
