import { Router } from 'express'
import { validationResult, checkSchema } from 'express-validator'

import Controller from './controller'

import checkRoles from '../../middlewares/checkRoles'
import verifyUser from '../../middlewares/verifyUser'

const router = Router()

router.use(verifyUser)
router.use(checkRoles(['admin']))

router.post('/create', checkSchema({
  subjectID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid subject id',
    },
    notEmpty: {
      errorMessage: 'No subject id specified',
    },
  },
  semesterID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid semester id',
    },
    notEmpty: {
      errorMessage: 'No semester id specified',
    },
  },
  hours: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid hours',
    },
    notEmpty: {
      errorMessage: 'No hours provided',
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
  hoursID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid hours id',
    },
    notEmpty: {
      errorMessage: 'No hours id provided',
    },
  },
  subjectID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid subject id',
    },
    notEmpty: {
      errorMessage: 'No subject id specified',
    },
  },
  semesterID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid semester id',
    },
    notEmpty: {
      errorMessage: 'No semester id specified',
    },
  },
  hours: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid hours',
    },
    notEmpty: {
      errorMessage: 'No hours provided',
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

router.post('/calculate', checkSchema({
  groupID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id provided',
    },
    notEmpty: {
      errorMessage: 'No group id provided',
    },
  },
  semesterID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid semester id provided',
    },
    notEmpty: {
      errorMessage: 'No semester id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const calculation = await Controller.calculate(req.body)

  return res.json(calculation)
})

export default router
