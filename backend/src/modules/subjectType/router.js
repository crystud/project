import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import Controller from './controller'
import userVerify from '../../middlewares/verifyUser'

const router = Router()

router.use(userVerify)

router.post('/create', checkSchema({
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No name specified',
    },
  },
  coefficient: {
    isNumeric: {
      errorMessage: 'Invalid coefficient specified',
    },
    notEmpty: {
      errorMessage: 'No coefficient specified',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const create = await Controller.createSubjectType(req.body)

  return res.json(create)
})

router.post('/edit', checkSchema({
  subjectTypeID: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No subject type id provided',
    },
    isNumeric: {
      errorMessage: 'Invalid subject type id',
    },
  },
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No name specified',
    },
  },
  coefficient: {
    isNumeric: {
      errorMessage: 'Invalid coefficient specified',
    },
    notEmpty: {
      errorMessage: 'No coefficient specified',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const edit = await Controller.editSubjectType(req.body)

  return res.json(edit)
})

export default router
