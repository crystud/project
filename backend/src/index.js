import express from 'express'
import cors from 'cors'

import database from './database'

import authorization from './modules/authorization'
import profile from './modules/profile'
import specialtys from './modules/specialty'
import subjectType from './modules/subjectType'
import subject from './modules/subject'
import hours from './modules/hours'
import commissions from './modules/commissions'
import department from './modules/department'
import semester from './modules/semester'
import teacher from './modules/teachers'
import rooms from './modules/rooms'
import student from './modules/student'
import classes from './modules/classes'
import students from './modules/student'
import users from './modules/users'
import subgroups from './modules/subgroups'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

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
semester(app)
teacher(app)
rooms(app)
classes(app)
students(app)
users(app)
subgroups(app)

app.listen(port)
