import { Model, DataTypes } from 'sequelize'
import Commissions from './commissions'
import SubjectTypes from './subject_types'
import sequelize from '../database'

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
},
{
  sequelize,
  modelName: 'subjects',
})

Subjects.belongsTo(Commissions, {
  foreignKey: 'commissionID',
  as: 'commission',
})

Commissions.hasMany(Subjects, {
  foreignKey: 'commissionID',
})

Subjects.belongsTo(SubjectTypes, {
  foreignKey: 'subjectType',
  as: 'subjectTypeData',
})

export default Subjects
