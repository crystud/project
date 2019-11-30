import { Sequelize, Model, DataTypes } from 'sequelize'
import Subjects from './subjects'
import Semesters from './semesters'

const sequelize = Sequelize('')

class Hours extends Model {}
Hours.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  subjectID: {
    type: DataTypes.INTEGER,
    references: {
      model: Subjects,
      key: 'id',
    },
  },
  semesterID: {
    type: DataTypes.INTEGER,
    references: {
      model: Semesters,
      key: 'id',
    },
  },
  hours: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'hours',
})

export default Hours
