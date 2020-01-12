import { Op } from 'sequelize'

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
      } = data

      const type = isFullTime ? 'fulltime' : 'pertime'

      const { exists: timetableExists } = await this.timetableExists({
        start,
        finish,
        order,
        type,
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
        timetable: create || null,
      }
    } catch (e) {
      console.error(e)

      return { created: false }
    }
  }

  static async timetableExists({
    start,
    finish,
    order,
    type,
  }) {
    try {
      if (!start || !finish || !order || !type) {
        return { exists: true }
      }

      const timetableExists = await Timetable.findOne({
        where: {
          [Op.or]: [
            {
              start: {
                [Op.gte]: start,
                [Op.lte]: finish,
              },
              type,
            },
            {
              finish: {
                [Op.gte]: start,
                [Op.lte]: finish,
              },
              type,
            },
            {
              order,
              type,
            },
          ],
        },
      })

      return { exists: !!timetableExists }
    } catch (e) {
      console.error(e)

      return { exists: true }
    }
  }

  static async edit(data) {
    const errors = []

    try {
      const {
        start,
        finish,
        order,
        type,
        timetableID: id,
      } = data

      const timetableExists = await Timetable.findOne({
        where: {
          [Op.or]: [
            {
              start: {
                [Op.gte]: start,
                [Op.lte]: finish,
              },
              id: {
                [Op.ne]: id,
              },
              type,
            },
            {
              finish: {
                [Op.gte]: start,
                [Op.lte]: finish,
              },
              id: {
                [Op.ne]: id,
              },
              type,
            },
            {
              order,
              type,
              id: {
                [Op.ne]: id,
              },
            },
          ],
        },
      })

      if (timetableExists) {
        errors.push({
          msg: 'Such timetable already exists',
          location: 'body',
          param: ['start', 'finish', 'order', 'type'],
        })

        return { errors }
      }

      const [edited] = await Timetable.update({
        start,
        finish,
        order,
      }, {
        where: { id },
      })

      return {
        edited: !!edited,
      }
    } catch (e) {
      console.error(e)

      return { edited: false }
    }
  }

  static async deleteTimetable({ timetableID: id }) {
    try {
      const deleting = await Timetable.destroy({
        where: { id },
      })

      return {
        deleted: !!deleting,
      }
    } catch (e) {
      console.error(e)

      return { deleted: false }
    }
  }

  static async getAll() {
    try {
      const order = [['order']]

      const [fullTime, partTime] = await Promise.all([
        await Timetable.findAll({
          where: { type: 'fulltime' },
          order,
        }),

        await Timetable.findAll({
          where: { type: 'pertime' },
          order,
        }),
      ])

      return { fullTime, partTime }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
