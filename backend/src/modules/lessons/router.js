import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import Controller from './controller'

import checkRoles from '../../middlewares/checkRoles'
import verifyUser from '../../middlewares/verifyUser'

const router = Router()

router.use(verifyUser)
router.use(checkRoles(['teacher', 'admin']))

router.post('/create', checkSchema({
  classID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid class id provided',
    },
    notEmpty: {
      errorMessage: 'No class id provided',
    },
  },
  date: {
    in: 'body',
    isISO8601: {
      errorMessage: 'Invalid date',
    },
    notEmpty: {
      errorMessage: 'No date provided',
    },
  },
  topic: {
    in: 'body',
    isString: {
      errorMessage: 'Invalid topic',
    },
    notEmpty: {
      errorMessage: 'No topic provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const created = await Controller.create({
    data: req.body,
    user: req.user,
  })

  return res.json(created)
})

router.post('/setTopic', checkSchema({
  lessonId: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid lesson id',
    },
    notEmpty: {
      errorMessage: 'No lesson id provided',
    },
  },
  topic: {
    in: 'body',
    isString: {
      errorMessage: 'Invalid topic',
    },
    notEmpty: {
      errorMessage: 'No topic provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }

  const edited = await Controller.setHomeWork({
    data: req.body,
    user: req.user,
  })

  return res.json(edited)
})

router.post('/setHomeWork', checkSchema({
  lessonId: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid lesson id',
    },
    notEmpty: {
      errorMessage: 'Lesson id shouldn`t be empty',
    },
  },
  homeWork: {
    in: 'body',
    isString: {
      errorMessage: 'Invalid homework',
    },
    notEmpty: {
      errorMessage: 'Homework shouldn`t be empty',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }

  const edited = await Controller.setHomeWork({
    data: req.body,
    user: req.user,
  })

  return res.json(edited)
})

export default router
