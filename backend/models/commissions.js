import { Sequelize, Model, DataTypes } from 'sequelize'

const sequelize = Sequelize('')

class Commissions extends Model {}
Commissions.init({
  id: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'commissions',
})

export default Commissions
