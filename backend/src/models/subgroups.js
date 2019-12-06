import { Model, DataTypes } from 'sequelize'
import Groups from './groups'
import sequelize from '../database'

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
      model: Groups,
      key: 'id',
    },
  },
},
{
  sequelize,
  modelName: 'subgroups',
})

export default Subgroups
