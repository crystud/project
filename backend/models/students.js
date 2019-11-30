import { Sequelize, Model, DataTypes } from 'sequelize'
import Group from './group'
import Users from './users'

const sequelize = Sequelize('')

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
      model: Group,
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
}, {
  sequelize,
  modelName: 'students',
})

export default Students
