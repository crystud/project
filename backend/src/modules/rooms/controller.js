import Rooms from '../../models/rooms'

export default class RoomController {
  static async create({ name, floor }) {
    const errors = []

    const roomData = {
      name,
      floor,
    }

    try {
      const exists = await Rooms.findOne(roomData)

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

      if (!create) {
        return { created: false }
      }

      return {
        created: true,
        room: create.dataValues,
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

      if (!edit) {
        return { edited: false }
      }

      return {
        edited: true,
        room: newRoomData,
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
      })

      if (!room) {
        errors.push({
          msg: 'Such room does not exist',
          param: 'roomID',
          location: 'body',
        })

        return { errors }
      }

      return { room }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
