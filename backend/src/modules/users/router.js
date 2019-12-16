import { Router } from 'express'
import { validationResult, checkSchema } from 'express-validator'

import Controller from './controller'

import verifyUser from '../../middlewares/verifyUser'
import checkRoles from '../../middlewares/checkRoles'

const router = Router()

router.use(verifyUser)

router.post('/list', checkRoles(['admin']), checkSchema({
  page: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid page provided',
      options: { min: 0 },
    },
    notEmpty: {
      errorMessage: 'No page provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const users = await Controller.list(req.body)

  return res.json(users)
})

router.post('/notStudents', checkRoles(['admin']), async (req, res) => {
  const notStudents = await Controller.getNotStudents()

  return res.json(notStudents)
})

router.post('/notTeachers', checkRoles(['admin']), async (req, res) => {
  const notTeachers = await Controller.getNotTeachers()

  return res.json(notTeachers)
})

router.post('/notAdmins', checkRoles(['admin']), async (req, res) => {
  const notAdmins = await Controller.getNotAdmins()

  return res.json(notAdmins)
})

export default router
