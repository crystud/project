import { Model, DataTypes } from 'sequelize'
import Commissions from './commissions'
import Users from './users'
import sequelize from '../database'

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
},
{
  sequelize,
  modelName: 'teachers',
})

Users.belongsTo(Teachers, {
  foreignKey: 'id',
  targetKey: 'userID',
  as: 'teacher',
})

Teachers.belongsTo(Commissions, {
  foreignKey: 'commissionID',
  as: 'commission',
})

Users.hasOne(Teachers, {
  foreignKey: 'userID',
})

export default Teachers
