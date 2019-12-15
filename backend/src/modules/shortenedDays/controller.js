import { Op } from 'sequelize'

import ShortenedDays from '../../models/shortened_days'

export default class ShortenedDaysController {
  static async create({ date, reason }) {
    const errors = []

    try {
      const exists = await ShortenedDays.findOne({
        where: { date },
      })

      if (exists) {
        errors.push({
          msg: 'Such shortened day already exists',
          location: 'body',
          param: 'date',
        })

        return { errors }
      }

      const create = await ShortenedDays.create({
        date, reason,
      })

      return {
        created: !!create,
        shortenedDay: create || null,
      }
    } catch (e) {
      console.error(e)

      return { created: false }
    }
  }

  static async delete({ shortenedDayID: id }) {
    const errors = []

    try {
      const exists = await ShortenedDays.findOne({
        where: { id },
      })

      if (!exists) {
        errors.push({
          msg: 'Such shortened day does not exists',
          location: 'body',
          param: 'shortenedDayID',
        })

        return { errors }
      }

      const deleteShortDay = await ShortenedDays.destroy({
        where: { id },
      })

      return {
        deleted: !!deleteShortDay,
      }
    } catch (e) {
      console.error(e)

      return { deleted: false }
    }
  }

  static async get({ date }) {
    try {
      const shortenedDay = await ShortenedDays.findOne({
        where: {
          date: {
            [Op.gt]: new Date(date),
          },
        },
      })

      if (!shortenedDay) {
        return {
          fetched: true,
          hasShortenedDaysAfter: false,
        }
      }

      return {
        hasShortenedDaysAfter: !!shortenedDay,
        shortenedDay,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
