import Sequelize from 'sequelize'

const database = process.env.DATABASE_NAME || 'database'
const username = process.env.DB_USERNAME || 'root'
const password = process.env.DB_PASSWORD || ''
const dbhost = process.env.DB_HOST || 'localhost'

const sequelize = new Sequelize(database, username, password, {
  host: dbhost,
  dialect: 'mariadb',
})

export default sequelize
