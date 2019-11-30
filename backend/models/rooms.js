import { Sequelize, Model, DataTypes } from 'sequelize'

const sequelize = Sequelize('')

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
}, {
  sequelize,
  modelName: 'rooms',
})

export default Rooms
