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
  home_work: {
    in: 'body',
    optional: true,
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

router.post('/delete', checkSchema({
  lessonID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid lesson id provided',
    },
    notEmpty: {
      errorMessage: 'No lesson id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const deleting = await Controller.deleteLesson(req.body)

  return res.json(deleting)
})

router.post('/edit', checkSchema({
  lessonID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid lesson id provided',
    },
    notEmpty: {
      errorMessage: 'No lesson id provided',
    },
  },
  topic: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No topic provided',
    },
  },
  homeWork: {
    in: 'body',
    optional: true,
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const deleting = await Controller.edit({
    ...req.body,
    user: req.user,
  })

  return res.json(deleting)
})

router.post('/getAll', checkSchema({
  classID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid class id provided',
    },
    notEmpty: {
      errorMessage: 'No class id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const lessons = await Controller.getAll(req.body)

  return res.json(lessons)
})

export default router
