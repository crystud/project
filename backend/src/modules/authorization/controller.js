import uuid from 'uuid/v1'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import config from '../../configs/authorization'

import Users from '../../models/users'
import RefreshTokens from '../../models/refresh_tokens'

export default class AuthorizationController {
  static async signIn({ email, password }) {
    const errors = []

    const { dataValues: { id: userID, password: passwordHash } } = await Users.findOne({
      attributes: ['id', 'password'],
      where: {
        email,
      },
    })

    const passwordIsCorrectly = await bcrypt.compare(password, passwordHash)

    if (!passwordIsCorrectly) {
      errors.push({
        msg: 'Password is incorrect',
        param: 'password',
        location: 'body',
      })

      return { errors }
    }

    const refreshToken = uuid()

    await RefreshTokens.create({
      userID,
      value: refreshToken,
    })

    const accessToken = await jwt.sign({
      userID,
      roles: [], // TODO: select users roles
    }, config.token.access.secret, {
      expiresIn: `${config.token.access.time}m`,
      algorithm: 'HS256',
    })

    return {
      access: accessToken,
      refresh: refreshToken,
    }
  }

  static async signUp(user) {
    const { email, password } = user

    const errors = []

    const emailIsFree = await Users.findAll({
      attributes: ['id'],
      where: {
        email,
      },
    })

    if (emailIsFree.length) {
      errors.push({
        msg: 'Email is used',
        param: 'email',
        location: 'body',
      })

      return { errors }
    }

    const passwordHash = await bcrypt.hash(password, config.password.hashSize)

    await Users.create({
      ...user,
      password: passwordHash,
    })

    return this.signIn(user)
  }

  static async logOut(token) {
    const { authorization } = token
    const refreshToken = authorization.split(' ')
    await RefreshTokens.update({
      status: 'WITHDRAWN',
    },
    {
      where: {
        value: refreshToken[1],
      },
    })
  }
}
