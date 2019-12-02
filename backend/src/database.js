import Sequelize from 'sequelize'

const database = process.env.database || 'database'
const username = process.env.username || 'root'
const password = process.env.password || ''
const dbhost = process.env.dbhost || 'localhost'

const sequelize = new Sequelize(database, username, password, {
  host: dbhost,
  dialect: 'mariadb',
})

export default sequelize
