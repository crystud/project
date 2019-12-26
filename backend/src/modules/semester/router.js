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

  const result = await Controller.edit(req.body)

  return res.json(result)
})

router.post('/get', checkSchema({
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

  const semester = await Controller.get(req.body)

  return res.json(semester)
})

router.post('/getAll', checkSchema({
  specialtyID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid specialty id provided',
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

  const semesters = await Controller.getAll(req.body)

  return res.json(semesters)
})

export default router
