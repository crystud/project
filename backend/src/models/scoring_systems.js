import { Model, DataTypes } from 'sequelize'
import sequelize from '../database'

class ScoringSystems extends Model {}
ScoringSystems.init({
  id: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
  min: DataTypes.FLOAT,
  max: DataTypes.FLOAT,
  minMark: DataTypes.FLOAT,
},
{
  sequelize,
  modelName: 'scoring_systems',
})

export default ScoringSystems
