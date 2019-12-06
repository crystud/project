import { Model, DataTypes } from 'sequelize'
import sequelize from '../database'

class ShortenedDays extends Model {}
ShortenedDays.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: DataTypes.DATE,
  reason: DataTypes.TEXT,
},
{
  sequelize,
  modelName: 'shortened_days',
})

export default ShortenedDays
