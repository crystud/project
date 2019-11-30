import { Sequelize, Model, DataTypes } from 'sequelize'

const sequelize = Sequelize('')

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
}, {
  sequelize,
  modelName: 'timetable',
})

export default Timetable
