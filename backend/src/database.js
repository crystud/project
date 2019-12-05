import Sequelize from 'sequelize'

import { production, test, development } from './config'


console.log({
  username: production.username || test.username || development.username,
  password: production.password || test.password || development.password,
  database: production.database || test.database || development.database,
  host: production.host || test.host || development.host,
  dialect: 'mariadb',
  timezone: 'Etc/GMT0',
  omitNull: true,
  define: {
    underscored: false,
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
    timestamps: true,
  },
})

const database = new Sequelize({
  username: production.username || test.username || development.username,
  password: production.password || test.password || development.password,
  database: production.database || test.database || development.database,
  host: production.host || test.host || development.host,
  dialect: 'mariadb',
  timezone: 'Etc/GMT0',
  omitNull: true,
  define: {
    underscored: false,
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
    timestamps: true,
  },
})

export default database
