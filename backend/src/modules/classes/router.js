import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import verifyUser from '../../middlewares/verifyUser'
import checkRoles from '../../middlewares/checkRoles'

import Controller from './controller'

const router = Router()

router.use(verifyUser)

router.post('/create', checkRoles(['admin']), checkSchema({
  teacherID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid teacher id',
      options: {
        min: 1,
      },
    },
    notEmpty: {
      errorMessage: 'No teacher id provided',
    },
  },
  subgroups: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid subgroups value',
      options: {
        min: 0,
        max: 1,
      },
    },
    notEmpty: {
      errorMessage: 'No subgroups value provided',
    },
  },
  groupID: {
    in: 'body',
  },
  subgroupID: {
    in: 'body',
  },
  subjectID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid subjectID',
      options: {
        min: 1,
      },
    },
    notEmpty: {
      errorMessage: 'No subjectID provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json(errors.array())
  }

  const result = await Controller.create(req.body)

  return res.json(result)
})

router.post('/edit', checkRoles(['admin']), checkSchema({
  classID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid class id provided',
    },
    notEmpty: {
      errorMessage: 'No class id provided',
    },
  },
  teacherID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid teacher id',
    },
    notEmpty: {
      errorMessage: 'No teacher id provided',
    },
  },
  subgroups: {
    in: 'body',
    isNumeric: {
      errorMessage: 'subgroups invalid',
    },
    notEmpty: {
      errorMessage: 'No subgroups value provided',
    },
  },
  groupID: {
    in: 'body',
  },
  subgroupID: {
    in: 'body',
  },
  subjectID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid subjectID',
      options: {
        min: 1,
      },
    },
    notEmpty: {
      errorMessage: 'No subjectID provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json(errors.array())
  }

  const result = await Controller.edit(req.body)

  return res.json(result)
})

router.post('/get', checkRoles(['admin', 'teacher', 'student']), checkSchema({
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
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const classData = await Controller.get(req.body)

  return res.json(classData)
})


router.post('/getGroupClasses', checkRoles(['admin', 'teacher', 'student']), checkSchema({
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

  const classes = await Controller.getGroupRegisters(req.body)

  return res.json(classes)
})

router.post('/setMark', checkRoles(['teacher', 'admin']), checkSchema({
  mark: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid mark',
    },
    notEmpty: {
      errorMessage: 'No mark provided',
    },
  },
  studentID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid student id',
      options: {
        min: 1,
      },
    },
    notEmpty: {
      errorMessage: 'No student id provided',
    },
  },
  lessonID: {
    in: 'body',
    isInt: {
      errorMessage: 'No lesson id provided',
      options: {
        min: 1,
      },
    },
    notEmpty: {
      errorMessage: 'No lesson id provided',
    },
  },
  isMiss: {
    in: 'body',
    isBoolean: {
      errorMessage: 'Invalid type',
    },
    notEmpty: {
      errorMessage: 'No isMiss property provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const set = await Controller.setMark({
    ...req.body,
    user: req.user,
  })

  return res.json(set)
})

router.post('/getMarks', checkRoles(['admin', 'teacher', 'student']), checkSchema({
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
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const classMarks = await Controller.getClassMarks(req.body)

  return res.json(classMarks)
})

router.post('/getStatistics', checkRoles(['admin', 'teacher', 'student']), checkSchema({
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
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const stats = await Controller.getStatistics(req.body)

  return res.json(stats)
})

export default router
