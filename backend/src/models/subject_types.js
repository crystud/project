import { Model, DataTypes } from 'sequelize'
import sequelize from '../database'

class SubjectTypes extends Model {}
SubjectTypes.init({
  id: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
  coefficient: DataTypes.FLOAT,
},
{
  sequelize,
  modelName: 'subject_types',
})

export default SubjectTypes
