import Timetable from '../../models/timetable'
import Classes from '../../models/classes'
import Schedule from '../../models/schedule'
import Rooms from '../../models/rooms'
import Teachers from '../../models/teachers'
import Subjects from '../../models/subjects'
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
      } = data

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

      return {
        created: !!create,
        timetable: create,
      }
    } catch (e) {
      console.error(e)

      return { created: false }
    }
  }

  static async getAll() {
    try {
      const timetables = await Timetable.findAll({
        order: [['start'], ['type']],
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

      return { timetables }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
