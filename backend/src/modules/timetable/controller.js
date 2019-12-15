import Timetable from '../../models/timetable'

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
}
