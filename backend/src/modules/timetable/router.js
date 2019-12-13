import { Router } from 'express'
import { validationResult, checkSchema } from 'express-validator'

import verifyUser from '../../middlewares/verifyUser'
import checkRoles from '../../middlewares/checkRoles'

import Controller from './controller'

const router = Router()

router.use(verifyUser)

router.post('/create', checkRoles(['admin']), checkSchema({
  order: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid order value',
    },
  },
  start: {
    in: 'body',
    isString: {
      errorMessage: 'Invalid start time',
    },
    notEmpty: {
      errorMessage: 'No start time provided',
    },
  },
  finish: {
    in: 'body',
    isString: {
      errorMessage: 'Invalid finish time',
    },
    notEmpty: {
      errorMessage: 'No finish time provided',
    },
  },
  isFullTime: {
    in: 'body',
    isBoolean: {
      errorMessage: 'Invalid isFullTime value',
    },
    notEmpty: {
      errorMessage: 'No timetable type provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const create = await Controller.createTimetable({
    ...req.body,
    user: req.user,
  })

  return res.json(create)
})

router.post('/list', checkSchema({
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

  const timetables = await Controller.list(req.body)

  return res.json(timetables)
})

export default router
