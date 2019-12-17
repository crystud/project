import uuid from 'uuid/v1'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { DataTypes } from 'sequelize'

import config from '../../configs/authorization'

import Users from '../../models/users'
import Teachers from '../../models/teachers'
import Students from '../../models/students'
import RefreshTokens from '../../models/refresh_tokens'

export default class AuthorizationController {
  static async generateToken(userID) {
    const refreshToken = uuid()
    const roles = ['user']

    await RefreshTokens.create({
      userID,
      value: refreshToken,
    })

    const [isStudent, isTeacher] = await Promise.all([
      Students.findOne({
        attributes: ['id'],
        where: {
          userID,
        },
      }),

      Teachers.findOne({
        attributes: ['id'],
        where: {
          userID,
        },
      }),
    ])

    if (isStudent) roles.push('student')
    if (isTeacher) roles.push('teacher')

    const accessToken = await jwt.sign({
      userID,
      roles,
    }, config.token.access.secret, {
      expiresIn: `${config.token.access.time}m`,
    })

    return {
      access: accessToken,
      refresh: refreshToken,
    }
  }


  static async signIn({ email, password }) {
    const errors = []

    try {
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

      return this.generateToken(userID)
    } catch {
      return {
        errors: [{
          msg: 'User not found',
          param: 'email',
          location: 'body',
        }],
      }
    }
  }

  static async signUp(user) {
    const { email, password } = user

    const errors = []

    const emailIsFree = await Users.findOne({
      attributes: ['id'],
      where: {
        email,
      },
    })

    if (emailIsFree) {
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

  static async refresh({ token }) {
    const errors = []

    const user = await RefreshTokens.findOne({
      attributes: ['userID'],
      where: {
        value: token,
      },
    })

    if (!user) {
      errors.push({
        msg: 'Token is not valid',
        param: 'token',
        location: 'body',
      })

      return { errors }
    }

    const { dataValues: { userID } } = user

    const deactivate = await RefreshTokens.update({
      status: 'USED',
      date_of_used: DataTypes.NOW,
    },
    {
      where: {
        value: token,
        status: 'ACTIVE',
      },
    })

    if (deactivate.length) {
      return this.generateToken(userID)
    }

    errors.push({
      msg: 'Token is not valid',
      param: 'token',
      location: 'body',
    })

    return { errors }
  }
}
