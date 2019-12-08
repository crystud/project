import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import Controller from './controller'

const router = Router()

router.post('/create', checkSchema({
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
    custom: {
      errorMessage: 'User id must be numeric',
      options: (value) => {
        if (value && value.isNumeric) {
          return value
        }

        return 0
      },
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

router.post('/edit', checkSchema({
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
  userID: {
    in: 'body',
    custom: {
      errorMessage: 'User id must be numeric',
      options: (value) => {
        if (!value || typeof value === 'number') {
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

router.post('/classes', checkSchema({
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

export default router
