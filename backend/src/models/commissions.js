import { Model, DataTypes } from 'sequelize'
import sequelize from '../database'

class Commissions extends Model {}
Commissions.init({
  id: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
},
{
  sequelize,
  modelName: 'commissions',
})

export default Commissions
