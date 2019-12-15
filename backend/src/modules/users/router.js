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

router.post('/isStudent', checkSchema({
  userID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid user id provided',
    },
    notEmpty: {
      errorMessage: 'No user id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const isStudent = await Controller.isStudent(req.body)

  return res.json(isStudent)
})

router.post('/isTeacher', checkSchema({
  userID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid user id provided',
    },
    notEmpty: {
      errorMessage: 'No user id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const isTeacher = await Controller.isTeacher(req.body)

  return res.json(isTeacher)
})

router.post('/isAdmin', checkSchema({
  userID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid user id provided',
    },
    notEmpty: {
      errorMessage: 'No user id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const isAdmin = await Controller.isAdmin(req.body)

  return res.json(isAdmin)
})

export default router
