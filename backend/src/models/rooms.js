import { Model, DataTypes } from 'sequelize'
import sequelize from '../database'

class Rooms extends Model {}
Rooms.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
  floor: DataTypes.SMALLINT,
  pavilionId: DataTypes.SMALLINT,
},
{
  sequelize,
  modelName: 'rooms',
})

export default Rooms
