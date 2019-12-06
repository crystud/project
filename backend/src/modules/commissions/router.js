import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import Controller from './controller'

const router = Router()

router.post('/create', checkSchema({
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'Name is not correctly',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json(errors.array())
  }

  const result = await Controller.create(req.body)

  return res.json(result)
})

router.post('/edit', checkSchema({
  id: {
    in: 'body',
  },
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'Name is not correctly',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json(errors.array())
  }

  const result = await Controller.edit(req.body)

  return res.json(result)
})

export default router
