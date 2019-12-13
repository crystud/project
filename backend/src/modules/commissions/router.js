import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import verifyUser from '../../middlewares/verifyUser'
import checkRoles from '../../middlewares/checkRoles'

import Controller from './controller'

const router = Router()

router.use(verifyUser)

router.post('/create', checkRoles(['admin']), checkSchema({
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'Incorrect name',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const result = await Controller.create(req.body)

  return res.json(result)
})

router.post('/edit', checkRoles(['admin']), checkSchema({
  id: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Incorrect commission ID',
    },
  },
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No commission name provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const result = await Controller.edit(req.body)

  return res.json(result)
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

  const commissions = await Controller.list(req.body)

  return res.json(commissions)
})

export default router
