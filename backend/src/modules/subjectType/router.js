import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import Controller from './controller'

import checkRoles from '../../middlewares/checkRoles'
import userVerify from '../../middlewares/verifyUser'

const router = Router()

router.use(userVerify)

router.post('/create', checkRoles(['admin']), checkSchema({
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No name specified',
    },
  },
  coefficient: {
    isNumeric: {
      errorMessage: 'Invalid coefficient specified',
    },
    notEmpty: {
      errorMessage: 'No coefficient specified',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const create = await Controller.createSubjectType(req.body)

  return res.json(create)
})

router.post('/edit', checkRoles(['admin']), checkSchema({
  subjectTypeID: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No subject type id provided',
    },
    isNumeric: {
      errorMessage: 'Invalid subject type id',
    },
  },
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No name specified',
    },
  },
  coefficient: {
    isNumeric: {
      errorMessage: 'Invalid coefficient specified',
    },
    notEmpty: {
      errorMessage: 'No coefficient specified',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const edit = await Controller.editSubjectType(req.body)

  return res.json(edit)
})

router.post('/get', checkRoles(['teacher', 'admin', 'student']), checkSchema({
  subjectTypeID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid subject type id',
    },
    notEmpty: {
      errorMessage: 'No subject type id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const subjectType = await Controller.get(req.body)

  return res.json(subjectType)
})

router.post('/list', checkRoles(['admin', 'teacher', 'student']), checkSchema({
  page: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No page provided',
    },
    isInt: {
      errorMessage: 'Invalid page provided',
      options: { min: 0 },
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const subjectTypes = await Controller.list(req.body)

  return res.json(subjectTypes)
})

export default router
