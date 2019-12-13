import { Op } from 'sequelize'

import Teachers from '../../models/teachers'
import Users from '../../models/users'
import Classes from '../../models/classes'
import Students from '../../models/students'

import config from '../../configs/teachers'

export default class TeachersController {
  static async create(teacher) {
    const { name, userID } = teacher

    const errors = []

    const user = await Users.findOne({
      where: {
        id: userID,
      },
      include: [{
        model: Teachers,
        as: 'teacher',
      },
      {
        model: Students,
        as: 'student',
      }],
    })

    if (!user) {
      errors.push({
        msg: 'The user doesn`t exist',
        param: 'userID',
        location: 'body',
      })

      return { errors }
    }

    if (user.teacher || user.student) {
      errors.push({
        msg: 'The user is booked',
        param: 'userID',
        location: 'body',
      })

      return { errors }
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

    const create = await Teachers.create(teacher)

    return {
      created: !!create,
      teacher: teacher || null,
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

    const update = await Teachers.update({ name, userID, commissionID }, {
      where: {
        id,
      },
    })

    return {
      updated: !!update,
      teacher: teacher || null,
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

  static async getList({ page }) {
    const { itemsOnPage: limit } = config
    const order = [['name']]

    try {
      const teachers = await Teachers.findAll({
        limit,
        order,
        offset: page * limit,
      })

      const hasNextPage = await Teachers.findOne({
        limit,
        order,
        offset: (page + 1) * limit,
      })

      return {
        teachers,
        hasNextPage: !!hasNextPage,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
