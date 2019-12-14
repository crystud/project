import { Router } from 'express'
import { validationResult, checkSchema } from 'express-validator'

import Controller from './controller'

import verifyUser from '../../middlewares/verifyUser'
import checkRoles from '../../middlewares/checkRoles'

const router = Router()

router.use(verifyUser)

router.post('/create', checkRoles(['admin']), checkSchema({
  date: {
    isISO8601: {
      errorMessage: 'Invalid date',
    },
    notEmpty: {
      errorMessage: 'No date provided',
    },
  },
  reason: {
    in: 'body',
    isString: {
      errorMessage: 'Invalid reason',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const create = await Controller.create(req.body)

  return res.json(create)
})

router.post('/delete', checkRoles(['admin']), checkSchema({
  shortenedDayID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid shortened day id',
      options: {
        min: 1,
      },
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const create = await Controller.delete(req.body)

  return res.json(create)
})

router.post('/getNext', checkRoles(['admin', 'teacher', 'student']), checkSchema({
  date: {
    in: 'body',
    isISO8601: {
      errorMessage: 'Invalid date',
    },
    notEmpty: {
      errorMessage: 'No date provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const create = await Controller.get(req.body)

  return res.json(create)
})

router.post('/getAll', checkRoles(['admin', 'student', 'teacher']), async (req, res) => {
  const days = await Controller.getAll()

  return res.json(days)
})

export default router
