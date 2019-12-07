import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import Controller from './controller'
import verifyUser from '../../middlewares/verifyUser'

const router = Router()

router.use(verifyUser)

router.post('/create', checkSchema({
  departmentID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid department Id',
    },
    notEmpty: {
      errorMessage: 'No department Id provided',
    },
  },
  name: {
    in: 'body',
    isString: {
      errorMessage: 'Invalid specialty name',
    },
    notEmpty: {
      errorMessage: 'No specialty name provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const create = await Controller.createSpecialty(req.body)

  return res.json(create)
})

router.post('/edit', checkSchema({
  specialtyID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid specialty id',
    },
    notEmpty: {
      errorMessage: 'No specialty specified',
    },
  },
  departmentID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid department Id',
    },
    notEmpty: {
      errorMessage: 'No department Id provided',
    },
  },
  name: {
    in: 'body',
    isString: {
      errorMessage: 'Invalid specialty name',
    },
    notEmpty: {
      errorMessage: 'No specialty name provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const create = await Controller.editSpecialty(req.body)

  return res.json(create)
})

export default router
