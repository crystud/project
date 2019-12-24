import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import Controller from './controller'
import { password } from '../../configs/authorization'

import verifyUser from '../../middlewares/verifyUser'

const router = Router()

router.use(verifyUser)

router.post('/getInformation', async (req, res) => {
  const result = await Controller.getInformation(req.user)

  return res.json(result)
})

router.post('/edit', checkSchema({
  name: {
    in: 'body',
    isString: {
      errorMessage: 'Incorrect name',
    },
    notEmpty: {
      errorMessage: 'Name field must not be empty',
    },
  },
  address: {
    in: 'body',
    isString: {
      errorMessage: 'Incorrect address value',
    },
    notEmpty: {
      errorMessage: 'Address field must not be empty',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  const { user } = req

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const editProfileResult = await Controller.editProfile({
    ...req.body,
    user,
  })

  return res.json(editProfileResult)
})

router.post('/changePassword', checkSchema({
  oldPassword: {
    in: 'body',
    notEmpty: {
      errorMessage: 'Password must not be empty',
    },
    isLength: {
      errorMessage: `Password should be at least ${password.minLength} chars long`,
      options: { min: password.minLength },
    },
  },
  newPassword: {
    in: 'body',
    notEmpty: {
      errorMessage: 'New password must not be empty',
    },
    isLength: {
      errorMessage: `Password should be at least ${password.minLength} chars long`,
      options: { min: password.minLength },
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const { user } = req

  const passwordChange = await Controller.changePassword({
    ...req.body,
    user,
  })

  return res.json(passwordChange)
})

export default router
