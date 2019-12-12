import Rooms from '../../models/rooms'
import Schedule from '../../models/schedule'
import Timetable from '../../models/timetable'
import Classes from '../../models/classes'
import Teachers from '../../models/teachers'
import Groups from '../../models/groups'
import Subjects from '../../models/subjects'

import config from '../../configs/rooms'

export default class RoomController {
  static async create({ name, floor }) {
    const errors = []

    const roomData = {
      name,
      floor,
    }

    try {
      const exists = await Rooms.findOne({
        where: { roomData },
      })

      if (exists) {
        errors.push({
          location: 'body',
          param: 'name',
          msg: 'Such room already exist',
        })

        return { errors }
      }

      const create = await Rooms.create({
        name,
        floor,
      })

      return {
        created: !!create,
        room: create || null,
      }
    } catch (e) {
      console.error(e)

      return { created: false }
    }
  }

  static async edit({ roomID: id, name, floor }) {
    const errors = []

    const newRoomData = { name, floor }

    try {
      const exists = await Rooms.findOne({
        where: { id },
      })

      if (!exists) {
        errors.push({
          msg: 'Such room does not exist',
          location: 'body',
          param: 'roomID',
        })

        return { errors }
      }

      const [edit] = await Rooms.update(newRoomData, {
        where: { id },
      })

      return {
        edited: !!edit,
        room: edit ? newRoomData : null,
      }
    } catch (e) {
      console.error(e)

      return { edited: false }
    }
  }

  static async get({ roomID: id }) {
    const errors = []

    try {
      const room = await Rooms.findOne({
        where: { id },
        include: {
          model: Schedule,
          as: 'schedules',
          include: [
            {
              model: Timetable,
              as: 'timetable',
            },
            {
              model: Classes,
              as: 'class',
              include: [
                {
                  model: Teachers,
                  as: 'teacher',
                },
                {
                  model: Groups,
                  as: 'group',
                },
                {
                  model: Subjects,
                  as: 'subject',
                },
              ],
            },
          ],
        },
      })

      if (!room) {
        errors.push({
          msg: 'Such room does not exist',
          param: 'roomID',
          location: 'body',
        })

        return { errors }
      }

      return {
        fetched: !!room,
        room: room || null,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async list({ page }) {
    const { itemsOnPage: limit } = config
    const order = [['name']]

    try {
      const rooms = await Rooms.findAll({
        limit,
        order,
        offset: page * limit,
      })

      const hasNextPage = await Rooms.findOne({
        limit,
        order,
        offset: (page + 1) * limit,
      })

      return {
        rooms,
        hasNextPage: !!hasNextPage,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
