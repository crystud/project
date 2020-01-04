import { Router } from 'express'
import { validationResult, checkSchema } from 'express-validator'

import checkRoles from '../../middlewares/checkRoles'
import verifyUser from '../../middlewares/verifyUser'

import Controller from './controller'

const router = Router()

router.use(verifyUser)

router.post('/create', checkRoles(['admin']), checkSchema({
  day: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid day',
      options: {
        min: 1,
        max: 7,
      },
    },
  },
  classID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid class id',
      options: {
        min: 1,
      },
    },
    notEmpty: {
      errorMessage: 'No class id provided',
    },
  },
  timetableID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid timetable id',
      options: {
        min: 1,
      },
    },
    notEmpty: {
      errorMessage: 'No timetable id provided',
    },
  },
  roomID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid room id',
      options: {
        min: 1,
      },
    },
    notEmpty: {
      errorMessage: 'No room id provided',
    },
  },
  isNumerator: {
    in: 'body',
    isBoolean: {
      errorMessage: 'Invalid isNumerator value',
    },
    notEmpty: {
      errorMessage: 'No isNumerator value provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const create = await Controller.createSchedule({
    ...req.body,
    user: req.user,
  })

  return res.json(create)
})

router.post('/day', checkRoles(['admin', 'teacher', 'student']), checkSchema({
  studentID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid student ID provided',
      options: { min: 1 },
    },
    notEmpty: {
      errorMessage: 'No stundet ID provided',
    },
  },
  day: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid day',
      options: {
        min: 1,
        max: 7,
      },
    },
    notEmpty: {
      errorMessage: 'No day provided',
    },
  },
  groupID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid group id',
      options: {
        min: 1,
      },
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

  const schedule = await Controller.getDaySchedule(req.body)

  return res.json(schedule)
})

router.post('/week', checkRoles(['admin', 'teacher', 'student']), checkSchema({
  groupID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid group id',
      options: {
        min: 1,
      },
    },
    notEmpty: {
      errorMessage: 'No group id provided',
    },
  },
  studentID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid student id provided',
      options: {
        min: 1,
      },
    },
    notEmpty: {
      errorMessage: 'No student id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const schedule = await Controller.getWeekSchedule(req.body)

  return res.json(schedule)
})

export default router
