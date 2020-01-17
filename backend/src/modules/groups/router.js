import { Router } from 'express'
import { validationResult, checkSchema } from 'express-validator'

import checkRoles from '../../middlewares/checkRoles'
import verifyUser from '../../middlewares/verifyUser'

import Controller from './controller'

const router = Router()

router.use(verifyUser)

router.post('/create', checkSchema({
  entry: {
    in: 'body',
    isISO8601: {
      errorMessage: 'Invalid entry date',
    },
    notEmpty: {
      errorMessage: 'No entry date specified',
    },
  },
  graduation: {
    in: 'body',
    isISO8601: {
      errorMessage: 'Invalid graduation date',
    },
    notEmpty: {
      errorMessage: 'No entry date specified',
    },
  },
  specialtyID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid specialty id',
    },
    notEmpty: {
      errorMessage: 'No specialty id provided',
    },
  },
  number: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid number provided',
    },
    notEmpty: {
      errorMessage: 'No group number provided',
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

router.post('/edit', checkRoles(['admin']), checkSchema({
  groupID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id',
    },
    notEmpty: {
      errorMessage: 'No group id provided',
    },
  },
  entry: {
    in: 'body',
    isISO8601: {
      errorMessage: 'Invalid entry date',
    },
    notEmpty: {
      errorMessage: 'No entry date specified',
    },
  },
  graduation: {
    in: 'body',
    isISO8601: {
      errorMessage: 'Invalid graduation date',
    },
    notEmpty: {
      errorMessage: 'No entry date specified',
    },
  },
  specialtyID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid specialty id',
    },
    notEmpty: {
      errorMessage: 'No specialty id provided',
    },
  },
  number: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid number provided',
    },
    notEmpty: {
      errorMessage: 'No group number provided',
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

router.post('/get', checkRoles(['admin', 'teacher', 'student']), checkSchema({
  groupID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id',
    },
    notEmpty: {
      errorMessage: 'No group id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const group = await Controller.get(req.body)

  return res.json(group)
})

router.post('/statistics', checkSchema({
  groupID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid group id',
    },
    notEmpty: {
      errorMessage: 'No group id provided',
    },
  },
  semesterID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid semester id',
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

  const result = await Controller.getStatistics(req.body)

  return res.json(result)
})

router.post('/getAll', checkRoles(['admin', 'teacher', 'student']), checkSchema({
  specialtyID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid specialty id provided',
      options: { min: 0 },
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

  const groups = await Controller.getAll(req.body)

  return res.json(groups)
})

router.post('/getSubgroups', checkSchema({
  groupID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id provided',
    },
    notEmpty: {
      errorMessage: 'No group id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const subgroups = await Controller.getSubgroups(req.body)

  return res.json(subgroups)
})

export default router
