import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import Controller from './controller'

import verifyUser from '../../middlewares/verifyUser'
import checkRoles from '../../middlewares/checkRoles'

const router = Router()

router.use(verifyUser)

router.post('/create', checkRoles(['admin']), checkSchema({
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

router.post('/edit', checkRoles(['admin']), checkSchema({
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

router.post('/get', checkRoles(['admin', 'teacher', 'student']), checkSchema({
  specialtyID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid specialty id',
    },
    notEmpty: {
      errorMessage: 'No specialty id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const specialty = await Controller.get(req.body)

  return res.json(specialty)
})

export default router
