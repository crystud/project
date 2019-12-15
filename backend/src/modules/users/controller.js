import Users from '../../models/users'
import Students from '../../models/students'
import Teachers from '../../models/teachers'

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
}
