import { Op } from 'sequelize'

import Teachers from '../../models/teachers'
import Users from '../../models/users'
import Classes from '../../models/classes'

export default class TeachersController {
  static async create(teacher) {
    const { name, userID } = teacher

    const errors = []

    if (userID) {
      const noUser = await Users.findOne({
        attributes: ['id'],
        where: {
          id: userID,
        },
      })

      if (!noUser) {
        errors.push({
          msg: 'The user doesn`t exist',
          param: 'userID',
          location: 'body',
        })

        return { errors }
      }

      const userExists = await Teachers.findOne({
        attributes: ['id'],
        where: {
          userID,
        },
      })

      if (userExists) {
        errors.push({
          msg: 'The user exists',
          param: 'userID',
          location: 'body',
        })

        return { errors }
      }
    }

    const teacheExists = await Teachers.findOne({
      attributes: ['id'],
      where: {
        name,
      },
    })

    if (teacheExists) {
      errors.push({
        msg: 'The teacher exists',
        param: 'name',
        location: 'body',
      })

      return { errors }
    }

    const created = await Teachers.create(teacher)

    if (!created) {
      return { created: false }
    }

    return {
      created: true,
      teacher,
    }
  }

  static async edit(teacher) {
    const {
      id, name, userID, commissionID,
    } = teacher

    const errors = []

    if (name) {
      const recordExists = await Teachers.findOne({
        attributes: ['id'],
        where: {
          name,
          id: {
            [Op.ne]: id,
          },
        },
      })

      if (recordExists) {
        errors.push({
          msg: 'The teacher exists',
          param: 'name',
          location: 'body',
        })

        return { errors }
      }
    }

    if (userID) {
      const noUser = await Users.findOne({
        attributes: ['id'],
        where: {
          id: userID,
        },
      })

      if (noUser) { //!
        errors.push({
          msg: 'The user doesn`t exist',
          param: 'userID',
          location: 'body',
        })

        return { errors }
      }

      const userExists = await Teachers.findOne({
        attributes: ['id'],
        where: {
          userID,
          id: {
            [Op.ne]: id,
          },
        },
      })

      if (userExists) {
        errors.push({
          msg: 'The user exists',
          param: 'userID',
          location: 'body',
        })

        return { errors }
      }
    }

    const updated = await Teachers.update({ name, userID, commissionID }, {
      where: {
        id,
      },
    })

    if (!updated) {
      return { updated: false }
    }

    return {
      updated: true,
      teacher,
    }
  }

  static async getClasses(teacher) {
    const { id } = teacher

    const classes = await Classes.findAll({
      where: {
        teacherID: id,
      },
    })

    return classes
  }
}
