import express from 'express'
import sequelize from './database'

const app = express()
const port = process.env.PORT || 3000

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

app.listen(port)
