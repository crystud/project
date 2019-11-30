import { Sequelize, Model, DataTypes } from 'sequelize'
import Timetable from './timetable'
import Rooms from './rooms'
import Lessons from './lessons'

const sequelize = Sequelize('')

class Schedule extends Model {}
Schedule.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  day: DataTypes.SMALLINT,
  lessonsID: {
    type: DataTypes.SMALLINT,
    references: {
      model: Lessons,
      key: 'id',
    },
  },
  tabletimeID: {
    type: DataTypes.SMALLINT,
    references: {
      model: Timetable,
      key: 'id',
    },
  },
  roomID: {
    type: DataTypes.INTEGER,
    references: {
      model: Rooms,
      key: 'id',
    },
  },
  type: DataTypes.ENUM('numerator', 'denominator'),
}, {
  sequelize,
  modelName: 'schedule',
})

export default Schedule
