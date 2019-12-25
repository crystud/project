import Rooms from '../../models/rooms'
import Schedule from '../../models/schedule'
import Timetable from '../../models/timetable'
import Classes from '../../models/classes'
import Groups from '../../models/groups'
import Subjects from '../../models/subjects'

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

  static async getAll({ floor }) {
    try {
      const rooms = await Rooms.findAll({
        where: { floor },
        order: [['name']],
      })

      return { rooms }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getRoomSchedule({ id: roomID }) {
    try {
      const classes = {
        list: [
          { day: 1, classes: [] },
          { day: 2, classes: [] },
          { day: 3, classes: [] },
          { day: 4, classes: [] },
          { day: 5, classes: [] },
          { day: 6, classes: [] },
          { day: 7, classes: [] },
        ],
        setItem: ({ day, classData }) => {
          const { list } = classes

          list.forEach(({ day: classDay }, index) => {
            if (day === classDay) {
              list[index].classes.push(classData)
            }
          })
        },
        rewriteItem: ({ day, order, classData }) => {
          const { list } = classes

          list.forEach(({ day: classDay, classes: classesList }, dayIndex) => {
            if (classDay === day) {
              classesList.forEach(({ order: classOrder }, classIndex) => {
                if (order === classOrder) {
                  list[dayIndex].classes[classIndex] = classData
                }
              })
            }
          })
        },
        getItem: ({ day, order }) => {
          let item = null

          classes.list.forEach((dayData) => {
            const { day: classDay } = dayData

            dayData.classes.forEach((classData) => {
              const { order: itemOrder } = classData

              if (day === classDay && order === itemOrder) {
                item = classData
              }
            })
          })

          return item
        },
        setItemOption: (data) => {
          const {
            optionName,
            day,
            order,
            value,
          } = data

          let set = false

          classes.list.forEach(({ day: classDay, classes: classesList }, dayIndex) => {
            classesList.forEach((classData, classIndex) => {
              const { order: itemOrder } = classData

              if (day === classDay && order === itemOrder) {
                classes.list[dayIndex].classes[classIndex] = {
                  ...classData,
                  [optionName]: value,
                }

                set = true
              }
            })
          })

          return { set }
        },
      }

      const [
        simpleNoSubgroupsClasses,
        numeratorClasses,
        denominatorClasses,
        simpleSubgroupsClasses,
        numeratorSubgroupsClasses,
        denominatorSubgroupsClasses,
      ] = await Promise.all([

        // simple classes (no subgroups)
        Schedule.findAll({
          where: {
            type: null,
            roomID,
          },
          include: [
            {
              model: Classes,
              as: 'class',
              where: {
                subgroups: 0,
              },
              include: [
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
            {
              model: Timetable,
              as: 'timetable',
            },
            {
              model: Rooms,
              as: 'room',
            },
          ],
        }),

        // simple numerator classes (no subgroups)
        Schedule.findAll({
          where: {
            type: 'numerator',
            roomID,
          },
          include: [
            {
              model: Classes,
              as: 'class',
              where: {
                subgroups: 0,
              },
              include: [
                {
                  model: Groups,
                  as: 'group',
                },
              ],
            },
            {
              model: Timetable,
              as: 'timetable',
            },
            {
              model: Rooms,
              as: 'room',
            },
          ],
        }),

        // simple denominator classes (no subgroups)
        Schedule.findAll({
          where: {
            type: 'denominator',
            roomID,
          },
          include: [
            {
              model: Classes,
              as: 'class',
              where: {
                subgroups: 0,
              },
              include: [
                {
                  model: Groups,
                  as: 'group',
                },
              ],
            },
            {
              model: Timetable,
              as: 'timetable',
            },
            {
              model: Rooms,
              as: 'room',
            },
          ],
        }),

        // simple subgroups classes
        Schedule.findAll({
          where: {
            type: null,
            roomID,
          },
          include: [
            {
              model: Classes,
              as: 'class',
              where: {
                subgroups: 1,
              },
              include: [
                {
                  model: Groups,
                  as: 'group',
                },
              ],
            },
            {
              model: Timetable,
              as: 'timetable',
            },
            {
              model: Rooms,
              as: 'room',
            },
          ],
        }),

        // numerator subgroups classes
        Schedule.findAll({
          where: {
            type: 'numerator',
            roomID,
          },
          include: [
            {
              model: Classes,
              as: 'class',
              where: {
                subgroups: 1,
              },
              include: [
                {
                  model: Groups,
                  as: 'group',
                },
              ],
            },
            {
              model: Timetable,
              as: 'timetable',
            },
            {
              model: Rooms,
              as: 'room',
            },
          ],
        }),

        // denominator subgroups classes
        Schedule.findAll({
          where: {
            type: 'denominator',
            roomID,
          },
          include: [
            {
              model: Classes,
              as: 'class',
              where: {
                subgroups: 1,
              },
              include: [
                {
                  model: Groups,
                  as: 'group',
                },
              ],
            },
            {
              model: Timetable,
              as: 'timetable',
            },
            {
              model: Rooms,
              as: 'room',
            },
          ],
        }),
      ])

      simpleNoSubgroupsClasses.forEach((rawClassData) => {
        const classData = rawClassData.toJSON()
        const { day, timetable: { order } } = classData

        if (classes.getItem({ order, day }) === null) {
          classes.setItem({
            day,
            classData: {
              ...classData,
              simpleClass: true,
              order,
            },
          })
        }
      })

      numeratorClasses.forEach((rawClassData) => {
        const classData = rawClassData.toJSON()
        const { day, timetable: { order } } = classData

        if (classes.getItem({ order, day }) === null) {
          classes.setItem({
            day,
            order,
            classData: {
              num: classData,
              order,
              numDenominatorClass: true,
            },
          })
        }
      })

      denominatorClasses.forEach((rawClassData) => {
        const classData = rawClassData.toJSON()
        const { day, timetable: { order } } = classData

        const weekTimeItem = classes.getItem({ order, day })

        if (weekTimeItem === null) {
          classes.setItem({
            day,
            classData: {
              denom: classData,
              order,
              numDenominatorClass: true,
            },
          })
        }

        if (weekTimeItem && weekTimeItem.numDenominatorClass) {
          classes.setItemOption({
            optionName: 'denom',
            day,
            order,
            value: classData,
          })
        }
      })

      simpleSubgroupsClasses.forEach((rawClassData) => {
        const classData = rawClassData.toJSON()
        const { day, timetable: { order } } = classData


        const scheduleClassData = classes.getItem({ order, day })

        if (scheduleClassData === null) {
          return classes.setItem({
            day,
            classData: {
              subgroups: [classData],
              simpleSubgroupsClass: true,
              order,
            },
          })
        }

        if (scheduleClassData !== null && scheduleClassData.simpleSubgroupsClass) {
          scheduleClassData.subgroups.push(classData)

          return classes.setItemOption({
            day,
            classData: {
              optionName: 'subgroups',
              day,
              order,
              value: scheduleClassData.subgroups,
            },
          })
        }

        return false
      })

      numeratorSubgroupsClasses.forEach((rawClassData) => {
        const classData = rawClassData.toJSON()
        const { day, timetable: { order } } = classData

        const scheduleClassData = classes.getItem({ order, day })

        if (scheduleClassData === null) {
          return classes.setItem({
            day,
            classData: {
              num: {
                subgroups: [classData],
              },
              numDenomSubgroupsClass: true,
              order,
            },
          })
        }

        if (scheduleClassData !== null) {
          if (!scheduleClassData.num) {
            scheduleClassData.num = {
              subgroups: [],
            }
          }

          if (!scheduleClassData.num.subgroups) {
            scheduleClassData.num = {
              subgroups: [],
            }
          }

          scheduleClassData.num.subgroups.push(classData)

          return classes.rewriteItem({
            day,
            order,
            classData: scheduleClassData,
          })
        }

        return false
      })

      denominatorSubgroupsClasses.forEach((rawClassData) => {
        const classData = rawClassData.toJSON()
        const { day, timetable: { order } } = classData

        const scheduleClassData = classes.getItem({ order, day })

        if (scheduleClassData === null) {
          return classes.setItem({
            day,
            classData: {
              denum: {
                subgroups: [classData],
              },
              numDenomSubgroupsClass: true,
              order,
            },
          })
        }

        if (scheduleClassData !== null) {
          if (!scheduleClassData.denum) {
            scheduleClassData.denum = {
              subgroups: [],
            }
          }

          if (!scheduleClassData.denum.subgroups) {
            scheduleClassData.denum = {
              subgroups: [],
            }
          }

          scheduleClassData.denum.subgroups.push(classData)

          return classes.rewriteItem({
            day,
            order,
            classData: scheduleClassData,
          })
        }

        return false
      })

      return classes
    } catch (e) {
      console.error(e)

      return { schedule: [] }
    }
  }
}
