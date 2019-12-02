import { Model, DataTypes } from 'sequelize'
import Specialtys from './specialtys'
import sequelize from '../database'

class Semesters extends Model {}
Semesters.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  number: DataTypes.SMALLINT,
  specialtyID: {
    type: DataTypes.SMALLINT,
    references: {
      model: Specialtys,
      key: 'id',
    },
  },
  weeks: DataTypes.INTEGER,
},
{
  sequelize,
  modelName: 'semesters',
})

export default Semesters
