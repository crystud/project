import Rooms from '../../models/rooms'

export default class RoomController {
  static async create({ name, floor }) {
    const errors = []

    const roomData = {
      name,
      floor,
    }

    try {
      const exists = await Rooms.findOne({
        where: roomData,
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
        attributes: ['id'],
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

      const isBusy = await Rooms.findOne({
        attributes: ['id'],
        where: newRoomData,
      })

      if (isBusy) {
        errors.push({
          msg: 'Such room already exist',
          location: 'body',
          param: ['name', 'floor'],
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
      })

      if (!room) {
        errors.push({
          msg: 'Such room does not exist',
          param: 'roomID',
          location: 'body',
        })

        return { errors }
      }

      const schedule = await this.getRoomSchedule({ id })

      return {
        fetched: !!room,
        room: {
          ...room.toJSON(),
          schedule,
        },
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getAll() {
    try {
      const rooms = await Rooms.findAll({
        order: [['name']],
      })

      return { rooms }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
