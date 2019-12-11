import { Router } from 'express'
import { validationResult, checkSchema } from 'express-validator'

import verifyUser from '../../middlewares/verifyUser'
import checkRoles from '../../middlewares/checkRoles'

import Controller from './controller'

const router = Router()

router.use(verifyUser)

router.post('/create', checkRoles(['admin']), checkSchema({
  subjectTypeID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Subject type id is invalid',
    },
    notEmpty: {
      errorMessage: 'No subject type id provided',
    },
  },
  commissionID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Commission id is invalid',
    },
    notEmpty: {
      errorMessage: 'No commission id provided',
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

  const create = await Controller.createSubject(req.body)

  return res.json(create)
})

router.post('/edit', checkRoles(['admin']), checkSchema({
  subjectID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Subject type id is invalid',
    },
    notEmpty: {
      errorMessage: 'No subject type id provided',
    },
  },
  subjectTypeID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Subject type id is invalid',
    },
    notEmpty: {
      errorMessage: 'No subject type id provided',
    },
  },
  commissionID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Commission id is invalid',
    },
    notEmpty: {
      errorMessage: 'No commission id provided',
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

  const edit = await Controller.editSubject(req.body)

  return res.json(edit)
})

router.post('/get', checkSchema({
  subjectID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid subject id',
    },
    notEmpty: {
      errorMessage: 'No subject id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const subject = await Controller.get(req.body)

  return res.json(subject)
})

router.post('/createScoringSystem', checkSchema({
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

router.post('/editScoringSystem', checkSchema({
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

export default router
