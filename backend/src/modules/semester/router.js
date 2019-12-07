import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import config from '../../configs/semesters'
import Controller from './controller'

const router = Router()

router.post('/create', checkSchema({
  number: {
    in: 'body',
    notEmpty: {
      errorMessage: 'Number souldn`t be empty',
    },
    isNumeric: {
      errorMessage: 'Number must be numeric',
    },
    isInt: {
      errorMessage: `Number must be at least ${config.number.minNumber} and not more than ${config.number.maxNumber}`,
      options: {
        min: config.number.minNumber,
        max: config.number.maxNumber,
      },
    },
  },
  weeks: {
    in: 'body',
    notEmpty: {
      errorMessage: 'Number of weeks souldn`t be empty',
    },
    isNumeric: {
      errorMessage: 'Number of weeks must be numeric',
    },
    isInt: {
      errorMessage: `Number must be at least ${config.weeks.minWeeksNumber} and not more than ${config.weeks.maxWeeksNumber}`,
      options: {
        min: config.weeks.minWeeksNumber,
        max: config.weeks.maxWeeksNumber,
      },
    },
  },
  specialtyID: {
    in: 'body',
    notEmpty: {
      errorMessage: 'Specialty id souldn`t be empty',
    },
    isNumeric: {
      errorMessage: 'Specialty id must be numeric',
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
      errorMessage: 'id souldn`t be empty',
    },
    isNumeric: {
      errorMessage: 'id must be numeric',
    },
  },
  number: {
    in: 'body',
  },
  weeks: {
    in: 'body',
  },
  specialtyID: {
    in: 'body',
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }

  const result = await Controller.edit(req.body)

  return res.json(result)
})

export default router
