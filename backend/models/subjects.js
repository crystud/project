import { Sequelize, Model, DataTypes } from 'sequelize'
import Commissions from './commissions'
import SubjectTypes from './subject_types'

const sequelize = Sequelize('')

class Subjects extends Model {}
Subjects.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
  commissionID: {
    type: DataTypes.SMALLINT,
    references: {
      model: Commissions,
      key: 'id',
    },
  },
  subjectType: {
    type: DataTypes.SMALLINT,
    references: {
      model: SubjectTypes,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'subjects',
})

export default Subjects
