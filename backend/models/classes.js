import { Sequelize, Model, DataTypes } from 'sequelize'
import Teachers from './teachers'
import Group from './group'
import Subgroups from './subgroups'
import Subjects from './subjects'

const sequelize = Sequelize('')

class Classes extends Model {}
Classes.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teacherID: {
    type: DataTypes.INTEGER,
    references: {
      model: Teachers,
      key: 'id',
    },
  },
  subgroups: DataTypes.BOOLEAN,
  groupID: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id',
    },
  },
  subgroupID: {
    type: DataTypes.INTEGER,
    references: {
      model: Subgroups,
      key: 'id',
    },
  },
  subjectID: {
    type: DataTypes.INTEGER,
    references: {
      model: Subjects,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'classes',
})

export default Classes
