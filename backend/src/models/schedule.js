import { Model, DataTypes } from 'sequelize'
import Timetable from './timetable'
import Rooms from './rooms'
import Classes from './classes'
import sequelize from '../database'

class Schedule extends Model {}
Schedule.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  day: DataTypes.SMALLINT,
  classID: {
    type: DataTypes.SMALLINT,
    references: {
      model: Classes,
      key: 'id',
    },
  },
  timetableID: {
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
},
{
  sequelize,
  modelName: 'schedule',
})

export default Schedule
