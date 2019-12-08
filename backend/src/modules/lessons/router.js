import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import Controller from './controller'
import checkRoles from '../../middlewares/checkRoles'

const router = Router()

router.use(checkRoles(['teacher']))

router.post('/create', checkSchema({
  classID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'ClassID should be numeric',
    },
    notEmpty: {
      errorMessage: 'ClassID shouldn`t be empty',
    },
  },
  date: {
    in: 'body',
    isISO8601: {
      errorMessage: 'Invalid date',
    },
    notEmpty: {
      errorMessage: 'Date shouldn`t be empty',
    },
  },
  topic: {
    in: 'body',
    isString: {
      errorMessage: 'Invalid topic',
    },
    notEmpty: {
      errorMessage: 'Topic shouldn`t be empty',
    },
  },
  home_work: {
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
    return res.json({
      errors: errors.array(),
    })
  }

  const created = await Controller.create(req.body)
  return res.json(created)
})

router.post('/setTopic', checkSchema({
  lessonId: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid lesson id',
    },
    notEmpty: {
      errorMessage: 'Lesson id shouldn`t be empty',
    },
  },
  topic: {
    in: 'body',
    isString: {
      errorMessage: 'Invalid topic',
    },
    notEmpty: {
      errorMessage: 'Topic shouldn`t be empty',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }

  const edited = Controller.setHomeWork(req.body)

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

  const edited = Controller.setHomeWork(req.body)

  return res.json(edited)
})

export default router
