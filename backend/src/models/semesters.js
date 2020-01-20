import { Model, DataTypes } from 'sequelize'
import Specialty from './specialty'
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
      model: Specialty,
      key: 'id',
    },
  },
  weeks: DataTypes.INTEGER,
},
{
  sequelize,
  modelName: 'semesters',
})

Semesters.belongsTo(Specialty, {
  foreignKey: 'specialtyID',
})

export default Semesters
