import { Sequelize, Model, DataTypes } from 'sequelize'
import Specialtys from './specialtys'

const sequelize = Sequelize('')

class Group extends Model {}
Group.init({
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
      model: Specialtys,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'group',
})

export default Group
