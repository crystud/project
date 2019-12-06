import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import config from '../../configs/authorization'
import Controller from './controller'

const router = Router()

router.post('/signIn', checkSchema({
  email: {
    in: 'body',
    notEmpty: {
      errorMessage: 'Email is not correctly',
    },
  },
  password: {
    in: 'body',
    notEmpty: {
      errorMessage: 'Password is not correctly',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json(errors.array())
  }

  const result = await Controller.signIn(req.body)

  return res.json(result)
})

router.post('/signUp', checkSchema({
  email: {
    in: 'body',
    isEmail: {
      errorMessage: 'Email is not correctly',
    },
  },
  password: {
    in: 'body',
    notEmpty: {
      errorMessage: 'Password is not correctly',
    },
    isLength: {
      errorMessage: `Password should be at least ${config.password.minLength} chars long`,
      options: { min: config.password.minLength },
    },
  },
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'Name is not correctly',
    },
  },
  address: {
    in: 'body',
    notEmpty: {
      errorMessage: 'Address is not correctly',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json(errors.array())
  }

  const result = await Controller.signUp(req.body)

  return res.json(result)
})

router.post('/logOut', async (req, res) => {
  const error = await Controller.logOut(req.headers.authorization)
  if (error.isEmpty) res.sendStatus(200)
  else {
    res.status(500)
    res.json(error[0])
  }
})

export default router
