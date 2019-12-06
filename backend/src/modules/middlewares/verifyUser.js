import jwt from 'jsonwebtoken'
import { checkSchema } from 'express-validator'

import { token as tokenInfo } from '../../configs/authorization'

export default async (app) => {
  app.use(checkSchema({
    token: {
      in: 'header',
      isJWT: {
        errorMessage: 'Invalid token',
      },
    },
  }), async (req, res, next) => {
    const { secret } = tokenInfo.access
    const { authorization } = req.headers

    const [, token] = authorization.split(' ')

    try {
      req.user = await jwt.verify(token, secret)

      return next()
    } catch (e) {
      return res.json({ accessTokenExpired: true })
    }
  })
}
