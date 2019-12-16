import Users from '../../models/users'
import Students from '../../models/students'
import Teachers from '../../models/teachers'

import sequelize from '../../database'

import config from '../../configs/users'

export default class UsersController {
  static async list({ page }) {
    const order = [['id', 'DESC']]
    const { itemsOnPage: limit } = config

    try {
      const users = await Users.findAll({
        limit,
        order,
        offset: page * limit,
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Students,
            as: 'student',
            required: false,
          },
          {
            model: Teachers,
            as: 'teacher',
            required: false,
          },
        ],
      })

      const hasNextPage = await Users.findOne({
        limit,
        order,
        offset: (page + 1) * limit,
      })

      return {
        hasNextPage: !!hasNextPage,
        users,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getNotStudents() {
    try {
      const notStudents = await sequelize.query(`SELECT user.id, user.name, user.email, user.address
      FROM users user
          LEFT JOIN students student ON user.id = student.userID
      WHERE student.userID IS NULL`, {
        model: Users,
        type: sequelize.QueryTypes.SELECT,
      })

      return { notStudents }
    } catch (e) {
      console.error(e)

      return {
        errors: [
          { msg: 'Unexpected error' },
        ],
      }
    }
  }

  static async getNotTeachers() {
    try {
      const notTeachers = await sequelize.query(`SELECT user.id, user.name, user.email, user.address
      FROM users user
          LEFT JOIN teachers teacher ON user.id = teacher.userID
      WHERE teacher.userID IS NULL`, {
        model: Users,
        type: sequelize.QueryTypes.SELECT,
      })

      return { notTeachers }
    } catch (e) {
      console.error(e)

      return {
        errors: [
          { msg: 'Unexpected error' },
        ],
      }
    }
  }

  static async getNotAdmins() {
    try {
      const notAdmins = await Users.findAll({
        attributes: {
          exclude: ['password'],
        },
        where: {
          isAdmin: false,
        },
      })

      return { notAdmins }
    } catch (e) {
      console.error(e)

      return {
        errors: [
          { msg: 'Unexpected error' },
        ],
      }
    }
  }
}
