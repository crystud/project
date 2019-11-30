import { Sequelize, Model, DataTypes } from 'sequelize'
import Classes from './classes'

const sequelize = Sequelize('')

class Lessons extends Model {}
Lessons.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  classID: {
    type: DataTypes.INTEGER,
    references: {
      model: Classes,
      key: 'id',
    },
  },
  date: DataTypes.DATE,
  topic: DataTypes.TEXT,
  home_work: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'lessons',
})

export default Lessons
