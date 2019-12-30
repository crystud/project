import { Op } from 'sequelize'

import Schedule from '../../models/schedule'
import Timetable from '../../models/timetable'
import Classes from '../../models/classes'
import Groups from '../../models/groups'
import Subgroups from '../../models/subgroups'
import Rooms from '../../models/rooms'

export default class ScheduleController {
  static async createSchedule(data) {
    const errors = []

    try {
      const {
        day,
        classID,
        timetableID,
        roomID,
        isNumerator = null,
      } = data

      const timetableData = await Timetable.findOne({
        where: {
          id: timetableID,
        },
      })

      if (!timetableData) {
        errors.push({
          msg: 'Such timetable does not exist',
          location: 'body',
          param: 'timetableID',
        })

        return { errors }
      }

      const classData = await Classes.findOne({
        where: {
          id: classID,
        },
      })

      if (!classData) {
        errors.push({
          msg: 'Such class does not exist',
          param: 'classID',
          location: 'body',
        })

        return { errors }
      }

      const roomExists = await Rooms.findOne({
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

      const { order } = timetableData
      const {
        subgroups,
        subgroupID,
        teacherID,
        groupID,
      } = classData

      const proceedCreating = async () => {
        const [roomIsFree, teacherIsFree] = await Promise.all([
          this.checkRoomIsFree({
            roomID,
            day,
            order,
            numeratorDenominator: isNumerator,
          }),

          this.checkTeacherIsFree({
            teacherID,
            day,
            order,
            numeratorDenominator: isNumerator,
          }),
        ])

        if (roomIsFree.hasClass) {
          errors.push({
            msg: 'Room is not available for class',
            location: 'body',
            param: 'roomID',
          })

          return { errors }
        }

        if (teacherIsFree.hasClass) {
          errors.push({
            msg: 'Teacher is not available for class',
            location: 'classData',
            param: 'teacherID',
          })

          return { errors }
        }

        const create = await Schedule.create({
          day,
          roomID,
          timetableID,
          classID,
          type: isNumerator,
        })

        return {
          created: !!create,
          schedule: create || null,
        }
      }

      let response = { isDone: false }

      if (subgroups) {
        const subgroupHasClass = await this.checkSubgroupIsFree({
          subgroupID,
          day,
          order,
          numeratorDenominator: isNumerator,
        })

        if (!subgroupHasClass.hasClass) {
          response = await proceedCreating()
        } else {
          errors.push({
            msg: 'This subgroup has class at this time',
            location: 'body',
            param: ['day', 'order'],
          })

          return { errors }
        }
      } else {
        const groupHasClass = await this.checkGroupIsFree({
          groupID,
          day,
          order,
          numeratorDenominator: isNumerator,
        })

        if (!groupHasClass.hasClass) {
          response = await proceedCreating()
        } else {
          errors.push({
            msg: 'This group has class at this time',
            location: 'body',
            param: ['day', 'order'],
          })

          return { errors }
        }
      }

      return response
    } catch (e) {
      console.log(e)

      return { created: false }
    }
  }

  static async delete({ scheduleID: id }) {
    try {
      const deleted = await Schedule.destroy({
        where: { id },
      })

      console.log(deleted)

      return { deleted }
    } catch (e) {
      console.error(e)

      return { deleted: false }
    }
  }

  static async edit(data) {
    const errors = []

    try {
      const {
        scheduleID,
        day,
        classID,
        timetableID,
        roomID,
        type: isNumerator = null,
      } = data

      console.log('------------------------', isNumerator)

      const timetableData = await Timetable.findOne({
        where: {
          id: timetableID,
        },
      })

      if (!timetableData) {
        errors.push({
          msg: 'Such timetable does not exist',
          location: 'body',
          param: 'timetableID',
        })

        return { errors }
      }

      const classData = await Classes.findOne({
        where: {
          id: classID,
        },
      })

      if (!classData) {
        errors.push({
          msg: 'Such class does not exist',
          param: 'classID',
          location: 'body',
        })

        return { errors }
      }

      const roomExists = await Rooms.findOne({
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

      const { order } = timetableData
      const {
        subgroups,
        subgroupID,
        teacherID,
        groupID,
      } = classData

      const proceedCreating = async () => {
        const [roomIsFree, teacherIsFree] = await Promise.all([
          this.checkRoomIsFree({
            roomID,
            day,
            order,
            numeratorDenominator: isNumerator,
          }),

          this.checkTeacherIsFree({
            teacherID,
            day,
            order,
            numeratorDenominator: isNumerator,
          }),
        ])

        if (roomIsFree.hasClass && roomIsFree.hasClass.id !== scheduleID) {
          errors.push({
            msg: 'Room is not available for class',
            location: 'body',
            param: 'roomID',
          })

          return { errors }
        }

        if (teacherIsFree.hasClass && teacherIsFree.hasClass.id !== scheduleID) {
          errors.push({
            msg: 'Teacher is not available for class',
            location: 'classData',
            param: 'teacherID',
          })

          return { errors }
        }

        console.log({
          day,
          roomID,
          timetableID,
          classID,
          type: isNumerator,
          where: { id: scheduleID },
        })

        const [edited] = await Schedule.update({
          day,
          roomID,
          timetableID,
          classID,
          type: isNumerator,
        }, {
          where: { id: scheduleID },
        })

        console.log(edited)

        return { edited: !!edited }
      }

      let response = { isDone: false }

      if (subgroups) {
        const subgroupHasClass = await this.checkSubgroupIsFree({
          subgroupID,
          day,
          order,
          numeratorDenominator: isNumerator,
        })

        if (!subgroupHasClass.hasClass || subgroupHasClass.hasClass.id === scheduleID) {
          response = await proceedCreating()
        } else {
          errors.push({
            msg: 'This subgroup has class at this time',
            location: 'body',
            param: ['day', 'order'],
          })

          return { errors }
        }
      } else {
        const groupHasClass = await this.checkGroupIsFree({
          groupID,
          day,
          order,
          numeratorDenominator: isNumerator,
        })

        if (!groupHasClass.hasClass || groupHasClass.hasClass.id === scheduleID) {
          response = await proceedCreating()
        } else {
          errors.push({
            msg: 'This group has class at this time',
            location: 'body',
            param: ['day', 'order'],
          })

          return { errors }
        }
      }

      return response
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

  static async checkGroupIsFree(data) {
    const {
      groupID,
      day,
      order,
      numeratorDenominator = null,
    } = data

    let type

    switch (numeratorDenominator) {
      case null:
        type = {
          [Op.or]: [null, 'numerator', 'denominator'],
        }
        break
      default:
        type = {
          [Op.or]: [numeratorDenominator, null],
        }
    }

    const hasClass = await Schedule.findOne({
      where: {
        day,
        type,
      },
      include: [
        {
          model: Timetable,
          as: 'timetable',
          where: {
            order,
          },
        },
        {
          model: Classes,
          as: 'class',
          where: {
            groupID,
          },
        },
      ],
    })

    return { hasClass }
  }

  static async checkTeacherIsFree(data) {
    const {
      teacherID,
      day,
      order,
      numeratorDenominator = null,
    } = data

    let type

    switch (numeratorDenominator) {
      case null:
        type = {
          [Op.or]: [null, 'numerator', 'denominator'],
        }
        break
      default:
        type = {
          [Op.or]: [numeratorDenominator, null],
        }
    }

    const hasClass = await Schedule.findOne({
      where: {
        day,
        type,
      },
      include: [
        {
          model: Timetable,
          as: 'timetable',
          where: {
            order,
          },
        },
        {
          model: Classes,
          as: 'class',
          where: {
            teacherID,
          },
        },
      ],
    })

    return { hasClass }
  }

  static async checkRoomIsFree(data) {
    const {
      roomID,
      day,
      order,
      numeratorDenominator = null,
    } = data

    let type

    switch (numeratorDenominator) {
      case null:
        type = {
          [Op.or]: [null, 'numerator', 'denominator'],
        }
        break
      default:
        type = {
          [Op.or]: [numeratorDenominator, null],
        }
    }

    const hasClass = await Schedule.findOne({
      where: {
        day,
        roomID,
        type,
      },
      include: [
        {
          model: Timetable,
          as: 'timetable',
          where: {
            order,
          },
        },
      ],
    })

    return { hasClass }
  }

  static async checkSubgroupIsFree(data) {
    const errors = []

    const {
      subgroupID,
      day,
      order,
      numeratorDenominator = null,
    } = data

    let type

    switch (numeratorDenominator) {
      case null:
        type = {
          [Op.or]: [null, 'numerator', 'denominator'],
        }
        break
      default:
        type = {
          [Op.or]: [numeratorDenominator, null],
        }
    }

    const subgroupHasClass = await Schedule.findOne({
      where: {
        day,
        type,
      },
      include: [
        {
          model: Classes,
          as: 'class',
          where: {
            subgroupID,
          },
        },
        {
          model: Timetable,
          as: 'timetable',
          where: {
            order,
          },
        },
      ],
    })

    if (subgroupHasClass) {
      return { hasClass: subgroupHasClass }
    }

    const subgroupData = await Subgroups.findOne({
      where: { id: subgroupID },
    })

    if (!subgroupData) {
      errors.push({
        msg: 'Such subgroup does not exist',
        param: 'subgroupID',
        location: 'body',
      })

      return { errors }
    }

    const { groupID } = subgroupData

    const groupHasClass = await Schedule.findOne({
      where: {
        day,
        type,
      },
      include: [
        {
          model: Classes,
          as: 'class',
          where: {
            groupID,
          },
        },
        {
          model: Timetable,
          as: 'timetable',
          where: {
            order,
          },
        },
      ],
    })

    // 1. check if subgroup has class at this time
    // 2. check if subgroup's entire group has class at this time

    return { hasClass: groupHasClass }
  }
}
