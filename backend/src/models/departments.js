import { Model, DataTypes } from 'sequelize'
import sequelize from '../database'
import Teachers from './teachers'

class Departments extends Model {}
Departments.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
  description: DataTypes.TEXT,
  leaderID: {
    type: DataTypes.INTEGER,
    references: {
      model: Teachers,
      key: 'id',
    },
  },
},
{
  sequelize,
  modelName: 'departments',
})

Departments.hasOne(Teachers, {
  foreignKey: 'id',
  as: 'leader',
})

export default Departments
