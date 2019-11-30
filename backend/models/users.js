import { Sequelize, Model, DataTypes } from 'sequelize'

const sequelize = Sequelize('')

class Users extends Model {}
Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.TEXT,
  address: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'users',
})

export default Users
