module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME || 'root',
    password: process.env.DEV_DB_PASSWORD || '',
    database: process.env.DEV_DB_NAME || 'crystud',
    host: process.env.DEV_DB_HOSTNAME || 'localhost',
    dialect: 'mariadb',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT+2',
    },
  },
}
