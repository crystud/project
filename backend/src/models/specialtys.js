import { Model, DataTypes } from 'sequelize'
import Departments from './departments'
import sequelize from '../database'

class Specialtys extends Model {}
Specialtys.init({
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
},
{
  sequelize,
  modelName: 'specialtys',
})

export default Specialtys
