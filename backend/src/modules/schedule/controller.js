import Schedule from '../../models/schedule'
import Timetable from '../../models/timetable'
import Classes from '../../models/classes'
import Groups from '../../models/groups'
import SubgroupsStudents from '../../models/subgroups_students'

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

  static async getDaySchedule(data) {
    const {
      groupID,
      day,
      studentID,
    } = data

    let { userSubgroups } = data

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

      if (!userSubgroups) {
        userSubgroups = await SubgroupsStudents.findAll({
          attributes: ['subgroupID'],
          where: {
            studentID,
          },
        })
      }

      const scheduleList = await Schedule.findAll({
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

      const schedule = []

      scheduleList.forEach((itemRaw) => {
        const item = itemRaw.toJSON()
        const {
          subgroups,
          subgroupID,
          type,
          timetable: { order },
        } = item

        if (subgroups) {
          let isUserSubgroup = false

          userSubgroups.forEach(({ subgroupID: userSubgroupItem }) => {
            if (userSubgroupItem === subgroupID) {
              isUserSubgroup = true
            }
          })

          if (!isUserSubgroup) {
            return
          }
        }

        if (!type) {
          schedule[order - 1] = item
        } else {
          if (!schedule[order - 1]) {
            schedule[order - 1] = [item]
          }

          let typeConflicts = false

          schedule[order - 1].forEach(({ type: timeType }) => {
            if (timeType !== type) {
              typeConflicts = true
            }
          })

          if (typeConflicts) {
            schedule[order - 1].push(item)

            schedule[order - 1].sort((a, b) => a.type < b.type)
          } else {
            console.log('conflict...')
          }
        }
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

  static async getWeekSchedule({ groupID, studentID }) {
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

      const days = await Promise.all([
        this.getDaySchedule({ groupID, studentID, day: 1 }),
        this.getDaySchedule({ groupID, studentID, day: 2 }),
        this.getDaySchedule({ groupID, studentID, day: 3 }),
        this.getDaySchedule({ groupID, studentID, day: 4 }),
        this.getDaySchedule({ groupID, studentID, day: 5 }),
        this.getDaySchedule({ groupID, studentID, day: 6 }),
      ])

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
