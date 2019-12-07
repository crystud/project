import { Model, DataTypes } from 'sequelize'
import sequelize from '../database'

class Timetable extends Model {}
Timetable.init({
  id: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  order: DataTypes.SMALLINT,
  start: DataTypes.TIME,
  finish: DataTypes.TIME,
  type: DataTypes.ENUM('fulltime', 'pertime'),
},
{
  sequelize,
  modelName: 'timetable',
  tableName: 'timetable',
})

export default Timetable
