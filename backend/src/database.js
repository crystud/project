import Sequelize from 'sequelize'

import { production, development } from './configs/db'

const dbData = process.env.NODE_ENV === 'production' ? production : development

const database = new Sequelize({
  username: dbData.username,
  password: dbData.password,
  database: dbData.database,
  host: dbData.host,
  dialect: 'mariadb',
  timezone: 'Etc/GMT0',
  omitNull: false,
  define: {
    underscored: false,
    timestamps: false,
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
  },
})

export default database
