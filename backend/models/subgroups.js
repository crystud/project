import { Sequelize, Model, DataTypes } from 'sequelize'
import Group from './group'

const sequelize = Sequelize('')

class Subgroups extends Model {}
Subgroups.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  groupID: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'subgroups',
})

export default Subgroups
