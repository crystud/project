import Timetable from '../../models/timetable'
import Classes from '../../models/classes'
import Schedule from '../../models/schedule'
import Rooms from '../../models/rooms'
import Teachers from '../../models/teachers'
import Subjects from '../../models/subjects'

import config from '../../configs/timetables'
import Groups from '../../models/groups'

export default class TimetableController {
  static async createTimetable(data) {
    const errors = []

    try {
      const {
        order,
        start,
        finish,
        isFullTime,
        user: { roles },
      } = data

      if (!roles.includes('admin')) {
        errors.push({
          msg: 'You do not have permission to create timetable',
          param: 'roles',
          location: 'user',
        })

        return { errors }
      }

      const timetableExists = await Timetable.findOne({
        where: {
          start,
          finish,
          order,
        },
      })

      if (timetableExists) {
        errors.push({
          msg: 'Such timetable already exists',
          param: ['start', 'finish', 'order'],
          location: 'body',
        })

        return { errors }
      }

      const create = await Timetable.create({
        order,
        start,
        finish,
        type: isFullTime ? 'fulltime' : 'pertime',
      })

      if (!create) {
        return { created: false }
      }

      return {
        created: true,
        timetable: create.dataValues,
      }
    } catch (e) {
      console.error(e)

      return { created: false }
    }
  }

  static async list({ page }) {
    const order = [['start'], ['type']]
    const { itemsOnPage: limit } = config

    try {
      const timetables = await Timetable.findAll({
        order,
        limit,
        offset: page * limit,
        include: {
          model: Schedule,
          as: 'schedule',
          include: [
            {
              model: Classes,
              as: 'class',
              include: [
                {
                  model: Subjects,
                  as: 'subject',
                },
                {
                  model: Teachers,
                  as: 'teacher',
                },
                {
                  model: Groups,
                  as: 'group',
                },
              ],
            },
            {
              model: Rooms,
              as: 'room',
            },
          ],
        },
      })

      const hasNextPage = await Timetable.findOne({
        limit,
        offset: (page + 1) * limit,
      })

      return {
        hasNextPage: !!hasNextPage,
        timetables,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
