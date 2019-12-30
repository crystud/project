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
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const create = await Controller.createSchedule(req.body)

  return res.json(create)
})

router.post('/delete', checkRoles(['admin']), checkSchema({
  scheduleID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid schedule id provided',
    },
    notEmpty: {
      errorMessage: 'No schedule id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const deleteResult = await Controller.delete(req.body)

  return res.json(deleteResult)
})

router.post('/edit', checkRoles(['admin']), checkSchema({
  scheduleID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid schedule id provided',
    },
    notEmpty: {
      errorMessage: 'No schedule id provided',
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
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const edit = await Controller.edit(req.body)

  return res.json(edit)
})

router.post('/day', checkRoles(['admin', 'teacher', 'student']), checkSchema({
  day: {
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

  const schedule = await Controller.getWeekSchedule(req.body)

  return res.json(schedule)
})

router.post('/checkGroupHasClass', checkSchema({
  groupID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id specified',
    },
    notEmpty: {
      errorMessage: 'No group id specified',
    },
  },
  day: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id specified',
    },
    notEmpty: {
      errorMessage: 'No group id specified',
    },
  },
  order: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id specified',
    },
    notEmpty: {
      errorMessage: 'No group id specified',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const check = await Controller.checkGroupIsFree(req.body)

  return res.json(check)
})

router.post('/checkTeacherHasClass', checkSchema({
  teacherID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid teacher id specified',
    },
    notEmpty: {
      errorMessage: 'No teacher id specified',
    },
  },
  day: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id specified',
    },
    notEmpty: {
      errorMessage: 'No group id specified',
    },
  },
  order: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id specified',
    },
    notEmpty: {
      errorMessage: 'No group id specified',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const check = await Controller.checkTeacherIsFree(req.body)

  return res.json(check)
})

router.post('/checkRoomHasClass', checkSchema({
  roomID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid room id specified',
    },
    notEmpty: {
      errorMessage: 'No room id specified',
    },
  },
  day: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id specified',
    },
    notEmpty: {
      errorMessage: 'No group id specified',
    },
  },
  order: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id specified',
    },
    notEmpty: {
      errorMessage: 'No group id specified',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const check = await Controller.checkRoomIsFree(req.body)

  return res.json(check)
})

router.post('/checkSubgroupHasClass', checkSchema({
  subgroupID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid subgroup id specified',
    },
    notEmpty: {
      errorMessage: 'No subgroup id specified',
    },
  },
  day: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id specified',
    },
    notEmpty: {
      errorMessage: 'No group id specified',
    },
  },
  order: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id specified',
    },
    notEmpty: {
      errorMessage: 'No group id specified',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const check = await Controller.checkSubgroupIsFree(req.body)

  return res.json(check)
})

export default router
