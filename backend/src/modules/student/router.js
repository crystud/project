import { Router } from 'express'
import { validationResult, checkSchema } from 'express-validator'

import Controller from './controller'
import verifyUser from '../../middlewares/verifyUser'

const router = Router()

router.use(verifyUser)

router.post('/create', checkSchema({
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No student name provided',
    },
  },
  groupID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id',
    },
    notEmpty: {
      errorMessage: 'No group id provided',
    },
  },
  address: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No address provided',
    },
  },
  userID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid user id',
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

  const create = await Controller.create(req.body)

  return res.json(create)
})

router.post('/edit', checkSchema({
  studentID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid student id',
    },
    notEmpty: {
      errorMessage: 'No student id provided',
    },
  },
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No student name provided',
    },
  },
  groupID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id',
    },
    notEmpty: {
      errorMessage: 'No group id provided',
    },
  },
  address: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No address provided',
    },
  },
  userID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid user id',
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

  const create = await Controller.edit(req.body)

  return res.json(create)
})

router.post('/get', checkSchema({
  studentID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid studentID',
    },
    notEmpty: {
      errorMessage: 'No student id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const student = await Controller.get(req.body)

  return res.json(student)
})

export default router
