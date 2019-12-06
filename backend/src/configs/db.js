module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME || 'root',
    password: process.env.DEV_DB_PASSWORD || '',
    database: process.env.DEV_DB_NAME || 'database_dev',
    host: process.env.DEV_DB_HOSTNAME || 'localhost',
    dialect: 'mariadb',
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: process.env.CI_DB_HOSTNAME,
    dialect: 'mariadb',
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT+2',
    },
  },
}
