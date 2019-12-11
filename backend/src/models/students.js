import { Model, DataTypes } from 'sequelize'
import Groups from './groups'
import Users from './users'
import sequelize from '../database'

class Students extends Model {}
Students.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
  groupID: {
    type: DataTypes.INTEGER,
    references: {
      model: Groups,
      key: 'id',
    },
  },
  address: DataTypes.TEXT,
  userID: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
  },
},
{
  sequelize,
  modelName: 'students',
})

Users.hasOne(Students, {
  foreignKey: 'userID',
  as: 'student',
})

export default Students
