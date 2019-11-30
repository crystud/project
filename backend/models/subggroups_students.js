import { Sequelize, Model, DataTypes } from 'sequelize'
import Subgroups from './subgroups'
import Students from './students'

const sequelize = Sequelize('')

class SubgroupsStudents extends Model {}
SubgroupsStudents.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  subgroupID: {
    type: DataTypes.INTEGER,
    references: {
      model: Subgroups,
      key: 'id',
    },
  },
  studentID: {
    type: DataTypes.INTEGER,
    references: {
      model: Students,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'subgroups_students',
})

export default SubgroupsStudents
