import { Router } from 'express'
import { validationResult, checkSchema } from 'express-validator'

import Controller from './controller'

import verifyUser from '../../middlewares/verifyUser'
import checkRoles from '../../middlewares/checkRoles'

const router = Router()

router.use(verifyUser)

router.post('/create', checkSchema({
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No student name provided',
    },
  },
  groupID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id',
    },
    notEmpty: {
      errorMessage: 'No group id provided',
    },
  },
  address: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No address provided',
    },
  },
  userID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid user id',
    },
    notEmpty: {
      errorMessage: 'No user id provided',
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
  studentID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid student id',
    },
    notEmpty: {
      errorMessage: 'No student id provided',
    },
  },
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No student name provided',
    },
  },
  groupID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid group id',
    },
    notEmpty: {
      errorMessage: 'No group id provided',
    },
  },
  address: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No address provided',
    },
  },
  userID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid user id',
    },
    notEmpty: {
      errorMessage: 'No user id provided',
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

router.post('/get', checkRoles(['admin', 'teacher']), checkSchema({
  studentID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid studentID',
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

  const student = await Controller.get(req.body)

  return res.json(student)
})

router.post('/list', checkSchema({
  page: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid page provided',
      options: { min: 0 },
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

  const list = await Controller.list(req.body)

  return res.json(list)
})

router.post('/statistics/week', checkSchema({
  studentID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid user id',
      options: {
        min: 1,
      },
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const statistics = await Controller.getWeekStatistics(req.body)

  return res.json(statistics)
})

router.post('/statistics/month', checkSchema({
  studentID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid user id',
      options: {
        min: 1,
      },
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const statistics = await Controller.getMonthStatistics(req.body)

  return res.json(statistics)
})

router.post('/statistics/global', checkSchema({
  studentID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid user id',
      options: {
        min: 1,
      },
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const statistics = await Controller.getGlobalStatistics(req.body)

  return res.json(statistics)
})

router.post('/getTeachers', checkSchema({
  studentID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid student id',
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

  const teachers = await Controller.getStudentTeachers(req.body)

  return res.json(teachers)
})

export default router
