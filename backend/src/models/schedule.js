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
  tableName: 'schedule',
})

Classes.belongsTo(Schedule, {
  foreignKey: 'id',
  as: 'schedule',
})

Timetable.hasMany(Schedule, {
  foreignKey: 'timetableID',
  as: 'schedule',
})

Schedule.belongsTo(Timetable, {
  foreignKey: 'timetableID',
  as: 'timetable',
})

Schedule.belongsTo(Classes, {
  foreignKey: 'classID',
  as: 'class',
})

Rooms.hasMany(Schedule, {
  foreignKey: 'roomID',
  as: 'schedules',
})

Schedule.hasOne(Rooms, {
  foreignKey: 'id',
  as: 'room',
})

export default Schedule
