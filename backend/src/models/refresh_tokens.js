import { Model, DataTypes } from 'sequelize'
import sequelize from '../database'
import Users from './users'

class RefreshTokens extends Model {}
RefreshTokens.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'WITHDRAWN', 'USED'),
    defaultValue: 'ACTIVE',
  },
  value: DataTypes.TEXT,
  date_of_create: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  date_of_used: {
    type: DataTypes.DATE,
    allowNull: true,
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
  modelName: 'refresh_tokens',
})

export default RefreshTokens
