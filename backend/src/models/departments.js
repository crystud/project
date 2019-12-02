import { Model, DataTypes } from 'sequelize'
import sequelize from '../database'

class Departments extends Model {}
Departments.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
  description: DataTypes.TEXT,
  leader: DataTypes.INTEGER,
},
{
  sequelize,
  modelName: 'departments',
})

export default Departments
