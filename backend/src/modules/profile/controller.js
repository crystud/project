import bcrypt from 'bcryptjs'

import Users from '../../models/users'
import Students from '../../models/students'

import { password } from '../../configs/authorization'

export default class ProfileController {
  static async getInformation({ userID: id }) {
    const errors = []

    const user = await Users.findOne({
      attributes: ['id', 'name', 'address', 'email'],
      where: {
        id,
      },
      include: {
        model: Students,
        as: 'student',
      },
    })

    if (!user) {
      errors.push({
        location: 'body',
        param: 'id',
        msg: 'There is no user with such id',
      })

      return { errors }
    }

    return { user }
  }

  static async editProfile({ name, address, user }) {
    const { userID: id } = user

    const [update] = await Users.update({ name, address }, {
      where: { id },
    })

    if (!update) {
      return { informationWasUpdated: false }
    }

    return {
      informationWasUpdated: true,
      user: {
        id,
        name,
        address,
      },
    }
  }

  static async changePassword({ oldPassword, newPassword, user }) {
    const errors = []

    const { userID: id } = user

    const userData = await Users.findOne({
      where: { id },
      attributes: ['password'],
    })

    if (!userData) {
      errors.push({
        msg: 'Failed to change password',
        location: 'header',
        param: 'authorization',
      })

      return { errors }
    }

    const { dataValues: { password: passwordHash } } = userData

    const passwordCheck = await bcrypt.compare(oldPassword, passwordHash)

    if (!passwordCheck) {
      errors.push({
        msg: 'Password is incorrect',
        location: 'body',
        params: 'oldPassword',
      })

      return { errors }
    }

    const newPasswordHash = await bcrypt.hash(newPassword, password.hashSize)

    const [update] = await Users.update({
      password: newPasswordHash,
    }, {
      where: { id },
    })

    if (!update) {
      return { passwordWasChanged: false }
    }

    return { passwordWasChanged: true }
  }
}
