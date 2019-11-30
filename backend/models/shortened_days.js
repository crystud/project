import { Sequelize, Model, DataTypes } from 'sequelize'

const sequelize = Sequelize('')

class ShortenedDays extends Model {}
ShortenedDays.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: DataTypes.DATE,
  reason: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'shortened_days',
})

export default ShortenedDays
