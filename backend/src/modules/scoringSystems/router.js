import { Router } from 'express'
import { validationResult, checkSchema } from 'express-validator'

import verifyUser from '../../middlewares/verifyUser'
import checkRoles from '../../middlewares/checkRoles'

import Controller from './controller'

const router = Router()

router.use(verifyUser)

router.post('/createScoringSystem', checkRoles(['admin']), checkSchema({
  minPossibleMark: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No minimal possible mark provided',
    },
  },
  maxPossibleMark: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No maximal possible mark provided',
    },
  },
  minPassingMark: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No minimal passing mark provided',
    },
  },
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No name provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const create = await Controller.createScoringSystem(req.body)

  return res.json(create)
})

router.post('/editScoringSystem', checkRoles(['admin']), checkSchema({
  scoringSystemID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid scoring system id provided',
      options: {
        min: 1,
      },
    },
    notEmpty: {
      errorMessage: 'No scoring system id provided',
    },
  },
  minPossibleMark: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No minimal possible mark provided',
    },
  },
  maxPossibleMark: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No maximal possible mark provided',
    },
  },
  minPassingMark: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No minimal passing mark provided',
    },
  },
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No name provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const create = await Controller.editScoringSystem(req.body)

  return res.json(create)
})

router.post('/getAll', checkRoles(['admin', 'teacher', 'student']), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const list = await Controller.list(req.body)

  return res.json(list)
})

export default router
