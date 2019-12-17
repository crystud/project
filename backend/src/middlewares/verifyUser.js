import jwt from 'jsonwebtoken'

import { token as tokenInfo } from '../configs/authorization'

export default async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      errors: [{
        msg: 'No access token provided',
        location: 'header',
        param: 'authorization',
      }],
    })
  }

  const { secret } = tokenInfo.access

  const [, token] = authorization.split(' ')

  try {
    req.user = await jwt.verify(token, secret)

    return next()
  } catch (e) {
    return res.json({ accessTokenExpired: true })
  }
}
