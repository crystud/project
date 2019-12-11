import { Model, DataTypes } from 'sequelize'
import sequelize from '../database'
import ScoringSystems from './scoring_systems'

class SubjectTypes extends Model {}
SubjectTypes.init({
  id: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
  coefficient: DataTypes.FLOAT,
  scoringSystemID: {
    type: DataTypes.SMALLINT,
    references: {
      model: ScoringSystems,
      key: 'id',
    },
  },
},
{
  sequelize,
  modelName: 'subject_types',
})

SubjectTypes.belongsTo(ScoringSystems, {
  as: 'scoring_system',
  foreignKey: 'scoringSystemID',
})

ScoringSystems.hasMany(SubjectTypes, {
  as: 'subject_types',
  foreignKey: 'scoringSystemID',
})

export default SubjectTypes
