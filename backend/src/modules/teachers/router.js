import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import verifyUser from '../../middlewares/verifyUser'
import checkRoles from '../../middlewares/checkRoles'

import Controller from './controller'

const router = Router()

router.post('/create', verifyUser, checkRoles(['admin']), checkSchema({
  name: {
    in: 'body',
    notEmpty: {
      errors: 'Name shouldn`t be empty',
    },
  },
  commissionID: {
    in: 'body',
    notEmpty: {
      errors: 'Commission shouldn`t be empty',
    },
    isNumeric: {
      errorMessage: 'Commission id must be numeric',
    },
  },
  userID: {
    in: 'body',
    notEmpty: {
      errors: 'User id shouldn`t be empty',
    },
    isNumeric: {
      errorMessage: 'User id must be numeric',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }

  const result = await Controller.create(req.body)

  return res.json(result)
})

router.post('/edit', verifyUser, checkRoles(['admin']), checkSchema({
  id: {
    in: 'body',
    notEmpty: {
      errors: 'id shouldn`t be empty',
    },
    isNumeric: {
      errorMessage: 'id must be numeric',
    },
  },
  name: {
    in: 'body',
  },
  commissionID: {
    in: 'body',
    custom: {
      errorMessage: 'Commission id must be numeric',
      options: (value) => {
        if (!value || typeof value === 'number') {
          console.log(value)
          return true
        }
        return false
      },
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }

  const result = await Controller.edit(req.body)

  return res.json(result)
})

router.post('/classes', checkRoles(['admin', 'teacher', 'student']), checkSchema({
  id: {
    in: 'body',
    notEmpty: {
      errors: 'id shouldn`t be empty',
    },
    isNumeric: {
      errorMessage: 'id must be numeric',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }

  const result = await Controller.getClasses(req.body)

  return res.json(result)
})

router.post('/list', checkRoles(['admin', 'teacher', 'student']), checkSchema({
  page: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid page provided',
      options: {
        min: 0,
      },
    },
    notEmpty: {
      errorMessage: 'No page provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }

  const result = await Controller.getList(req.body)

  return res.json(result)
})

export default router
