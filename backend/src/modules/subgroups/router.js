import { Router } from 'express'
import { validationResult, checkSchema } from 'express-validator'

import Controller from './controller'

import checkRoles from '../../middlewares/checkRoles'
import verifyUser from '../../middlewares/verifyUser'

const router = Router()

router.use(verifyUser)

router.post('/create', checkRoles(['admin']), checkSchema({
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
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No subgroup name provided',
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
  subgroupID: {
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
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No subgroup name provided',
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

router.post('/addStudent', checkRoles(['admin']), checkSchema({
  studentID: {
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
  subgroupID: {
    isInt: {
      errorMessage: 'Invalid subgroup id',
      options: {
        min: 1,
      },
    },
    notEmpty: {
      errorMessage: 'No subgroup id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const insert = await Controller.addStudent(req.body)

  return res.json(insert)
})

router.post('/removeStudent', checkRoles(['admin']), checkSchema({
  studentID: {
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
  subgroupID: {
    isInt: {
      errorMessage: 'Invalid subgroup id',
      options: {
        min: 1,
      },
    },
    notEmpty: {
      errorMessage: 'No subgroup id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const insert = await Controller.removeStudent(req.body)

  return res.json(insert)
})

router.post('/get', checkRoles(['admin', 'teacher']), checkSchema({
  subgroupID: {
    isInt: {
      errorMessage: 'Invalid subgroup id',
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

  const subgroup = await Controller.get(req.body)

  return res.json(subgroup)
})

router.post('/getOnGroup', checkRoles(['admin', 'teacher']), checkSchema({
  groupID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid group id provided',
      options: { min: 1 },
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

  const subgroups = await Controller.getOnGroup(req.body)

  return res.json(subgroups)
})

export default router
