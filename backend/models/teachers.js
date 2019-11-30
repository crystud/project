import { Sequelize, Model, DataTypes } from 'sequelize'
import Commissions from './commissions'
import Users from './users'

const sequelize = Sequelize('')

class Teachers extends Model {}
Teachers.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
  commissionID: {
    type: DataTypes.SMALLINT,
    references: {
      model: Commissions,
      key: 'id',
    },
  },
  userID: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'teachers',
})

export default Teachers
