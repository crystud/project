import { Sequelize, Model, DataTypes } from 'sequelize'
import Departments from './departments'

const sequelize = Sequelize('')

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
}, {
  sequelize,
  modelName: 'specialtys',
})

export default Specialtys
