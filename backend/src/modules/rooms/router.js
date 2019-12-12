import { Router } from 'express'
import { validationResult, checkSchema } from 'express-validator'

import checkRoles from '../../middlewares/checkRoles'
import verifyUser from '../../middlewares/verifyUser'

import Controller from './controller'

const router = Router()

router.use(verifyUser)

router.post('/create', checkRoles(['admin']), checkSchema({
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No room name provided',
    },
  },
  floor: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid floor value',
    },
    notEmpty: {
      errorMessage: 'No floor provided',
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
  roomID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid room id',
    },
    notEmpty: {
      errorMessage: 'No room id provided',
    },
  },
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No room name provided',
    },
  },
  floor: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid floor value',
    },
    notEmpty: {
      errorMessage: 'No floor provided',
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
  roomID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid room id',
    },
    notEmpty: {
      errorMessage: 'No room id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const create = await Controller.get(req.body)

  return res.json(create)
})

router.post('/list', checkRoles(['admin', 'teacher', 'student']), checkSchema({
  page: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid page provided',
      options: {
        min: 0,
      },
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

  const create = await Controller.list(req.body)

  return res.json(create)
})

export default router
