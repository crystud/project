import { Model, DataTypes } from 'sequelize'
import Departments from './departments'
import sequelize from '../database'

class Specialty extends Model {}
Specialty.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  departmentID: {
    type: DataTypes.INTEGER,
    references: {
      model: Departments,
      key: 'id',
    },
  },
  name: DataTypes.TEXT,
  symbol: DataTypes.TEXT,
},
{
  sequelize,
  modelName: 'specialty',
  tableName: 'specialty',
})

Specialty.belongsTo(Departments, {
  foreignKey: 'departmentID',
  as: 'department',
})

Departments.hasMany(Specialty, {
  foreignKey: 'departmentID',
  as: 'specialtys',
})

export default Specialty
