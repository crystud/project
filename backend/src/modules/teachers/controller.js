import { Op } from 'sequelize'

import Teachers from '../../models/teachers'
import Users from '../../models/users'
import Classes from '../../models/classes'
import Students from '../../models/students'
import Commissions from '../../models/commissions'
import Departments from '../../models/departments'
import Schedule from '../../models/schedule'
import Timetable from '../../models/timetable'
import Rooms from '../../models/rooms'
import Groups from '../../models/groups'
import Subjects from '../../models/subjects'

export default class TeachersController {
  static async create(teacher) {
    const { name, userID } = teacher

    const errors = []

    const user = await Users.findOne({
      where: {
        id: userID,
      },
      include: [{
        model: Teachers,
        as: 'teacher',
      },
      {
        model: Students,
        as: 'student',
      }],
    })

    if (!user) {
      errors.push({
        msg: 'The user doesn`t exist',
        param: 'userID',
        location: 'body',
      })

      return { errors }
    }

    if (user.teacher || user.student) {
      errors.push({
        msg: 'The user is booked',
        param: 'userID',
        location: 'body',
      })

      return { errors }
    }

    const teacheExists = await Teachers.findOne({
      attributes: ['id'],
      where: {
        name,
      },
    })

    if (teacheExists) {
      errors.push({
        msg: 'The teacher exists',
        param: 'name',
        location: 'body',
      })

      return { errors }
    }

    const create = await Teachers.create(teacher)

    return {
      created: !!create,
      teacher: teacher || null,
    }
  }

  static async edit(teacher) {
    const {
      id, name, userID, commissionID,
    } = teacher

    const errors = []

    if (name) {
      const recordExists = await Teachers.findOne({
        attributes: ['id'],
        where: {
          name,
          id: {
            [Op.ne]: id,
          },
        },
      })

      if (recordExists) {
        errors.push({
          msg: 'The teacher exists',
          param: 'name',
          location: 'body',
        })

        return { errors }
      }
    }

    const update = await Teachers.update({ name, userID, commissionID }, {
      where: {
        id,
      },
    })

    return {
      updated: !!update,
      teacher: teacher || null,
    }
  }

  static async getClasses(teacher) {
    const { id } = teacher

    const classes = await Classes.findAll({
      where: {
        teacherID: id,
      },
    })

    return classes
  }

  static async getTeacherSchedule({ id: teacherID }) {
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
          },
          include: [
            {
              model: Classes,
              as: 'class',
              where: {
                teacherID,
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
          },
          include: [
            {
              model: Classes,
              as: 'class',
              where: {
                teacherID,
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
          },
          include: [
            {
              model: Classes,
              as: 'class',
              where: {
                teacherID,
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
          },
          include: [
            {
              model: Classes,
              as: 'class',
              where: {
                teacherID,
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
          },
          include: [
            {
              model: Classes,
              as: 'class',
              where: {
                teacherID,
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
          },
          include: [
            {
              model: Classes,
              as: 'class',
              where: {
                teacherID,
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

        console.log(scheduleClassData)

        if (scheduleClassData === null) {
          console.log('denumerator subgroups ............................................')

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

  static async get(teacher) {
    const { id } = teacher

    const result = await Teachers.findOne({
      where: { id },
      include: [
        {
          model: Commissions,
          as: 'commission',
        },
        {
          model: Users,
          as: 'user',
          attributes: ['email'],
        },
        {
          model: Departments,
          as: 'department',
        },
      ],
    })

    const schedule = await this.getTeacherSchedule({ id })

    return {
      fetched: !!result,
      teacher: {
        ...result.toJSON(),
        schedule,
      },
    }
  }

  static async getAllOnCommission({ commissionID }) {
    const result = await Teachers.findAll({
      where: { commissionID },
      order: [['name']],
      include: [
        {
          model: Users,
          as: 'user',
          attributes: {
            exclude: 'password',
          },
        },
      ],
    })

    return {
      fetched: !!result,
      teachers: result || null,
    }
  }

  static async getAll() {
    const result = await Teachers.findAll({
      order: [['name']],
      include: [
        {
          model: Users,
          as: 'user',
          attributes: {
            exclude: 'password',
          },
        },
      ],
    })

    return {
      fetched: !!result,
      teachers: result || null,
    }
  }
}
