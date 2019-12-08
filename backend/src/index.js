import express from 'express'

import database from './database'

import authorization from './modules/authorization'
import profile from './modules/profile'
import specialtys from './modules/specialty'
import subjectType from './modules/subjectType'
import subject from './modules/subject'
import hours from './modules/hours'
import commissions from './modules/commissions'
import department from './modules/department'
import lessons from './modules/lessons'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

database
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

authorization(app, database)
profile(app)
specialtys(app)
subjectType(app)
subject(app)
hours(app)
commissions(app)
department(app)
lessons(app)
app.listen(port)
