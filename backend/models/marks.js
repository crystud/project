import { Sequelize, Model, DataTypes } from 'sequelize'
import Students from './students'
import Lessons from './lessons'

const sequelize = Sequelize('')

class Marks extends Model {}
Marks.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentID: {
    type: DataTypes.INTEGER,
    references: {
      model: Students,
      key: 'id',
    },
  },
  lessonID: {
    type: DataTypes.INTEGER,
    references: {
      model: Lessons,
      key: 'id',
    },
  },
  mark: DataTypes.SMALLINT,
  type: DataTypes.ENUM('mark', 'miss'),
}, {
  sequelize,
  modelName: 'marks',
})

export default Marks
