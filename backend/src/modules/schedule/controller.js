import Schedule from '../../models/schedule'
import Timetable from '../../models/timetable'
import Classes from '../../models/classes'
import Groups from '../../models/groups'

export default class ScheduleController {
  static async createSchedule(data) {
    const errors = []

    try {
      const {
        day,
        classID,
        timetableID,
        roomID,
        isNumerator,
      } = data

      const timetableExists = await Timetable.findOne({
        where: {
          id: timetableID,
        },
      })

      if (!timetableExists) {
        errors.push({
          msg: 'Such timetable does not exist',
          location: 'body',
          param: 'timetableID',
        })

        return { errors }
      }

      const classExists = await Classes.findOne({
        where: {
          id: classID,
        },
      })

      if (!classExists) {
        errors.push({
          msg: 'Such class does not exist',
          param: 'classID',
          location: 'body',
        })

        return { errors }
      }

      const roomExists = await Classes.findOne({
        where: {
          id: roomID,
        },
      })

      if (!roomExists) {
        errors.push({
          msg: 'Such room does not exist',
          param: 'roomID',
          location: 'body',
        })

        return { errors }
      }

      const scheduleExists = await Schedule.findOne({
        where: {
          day,
          timetableID,
          type: isNumerator ? 'numerator' : 'denominator',
        },
      })

      if (scheduleExists) {
        errors.push({
          msg: 'Such schedule already exists',
          param: ['day', 'roomID', 'timetableID'],
          location: 'body',
        })

        return { errors }
      }

      const create = await Schedule.create({
        day,
        roomID,
        timetableID,
        classID,
        type: isNumerator ? 'numerator' : 'denominator',
      })

      return {
        created: !!create,
        schedule: create || null,
      }
    } catch (e) {
      console.log(e)

      return { created: false }
    }
  }

  static async getDaySchedule({ groupID, day }) {
    const errors = []

    try {
      const groupExists = await Groups.findOne({
        where: { id: groupID },
      })

      if (!groupExists) {
        errors.push({
          msg: 'Such group does not exists',
          location: 'body',
          param: 'groupID',
        })

        return { errors }
      }

      const schedule = await Schedule.findAll({
        where: { day },
        include: [
          {
            model: Classes,
            as: 'class',
            where: { groupID },
          },
          {
            model: Timetable,
            as: 'timetable',
          },
        ],
        order: [
          [
            {
              model: Timetable,
              as: 'timetable',
            },
            'order',
          ],
        ],
      })

      return {
        fetched: true,
        schedule,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getWeekSchedule({ groupID }) {
    const errors = []

    try {
      const groupExists = await Groups.findOne({
        where: { id: groupID },
      })

      if (!groupExists) {
        errors.push({
          msg: 'Such group does not exists',
          location: 'body',
          param: 'groupID',
        })

        return { errors }
      }

      const schedule = await Schedule.findAll({
        order: [
          [
            {
              model: Timetable,
              as: 'timetable',
            },
            'order',
          ],
        ],
        include: [
          {
            model: Classes,
            as: 'class',
            where: { groupID },
          },
          {
            model: Timetable,
            as: 'timetable',
          },
        ],
      })

      const days = []

      schedule.forEach((item) => {
        const { day } = item

        if (!days[day]) {
          days[day] = {
            day,
            classes: [],
          }
        }

        days[day].classes.push(item)
      })

      return {
        fetched: true,
        days,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
