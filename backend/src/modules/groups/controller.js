import Groups from '../../models/groups'
import Specialty from '../../models/specialty'
import Students from '../../models/students'
import Marks from '../../models/marks'
import Lessons from '../../models/lessons'
import Classes from '../../models/classes'
import Subjects from '../../models/subjects'
import Hours from '../../models/hours'
import Schedule from '../../models/schedule'
import Rooms from '../../models/rooms'
import Timetable from '../../models/timetable'
import Teachers from '../../models/teachers'
import SubjectTypes from '../../models/subject_types'
import Subgroups from '../../models/subgroups'

export default class GroupsController {
  static async create(data) {
    const errors = []

    const {
      specialtyID,
      number,
      entry,
      graduation,
    } = data

    try {
      const exists = await Groups.count({
        where: {
          specialtyID,
          number,
          entry,
          graduation,
        },
      })

      if (exists) {
        errors.push({
          msg: 'Such group already exists',
          location: 'body',
          param: 'specialtyID',
        })

        return { errors }
      }

      const specialtyExists = await Specialty.count({
        where: { id: data.specialtyID },
      })

      if (!specialtyExists) {
        errors.push({
          msg: 'Such specialty does not exist',
          param: 'specialtyID',
          location: 'body',
        })

        return { errors }
      }

      const group = await Groups.create(data)

      return {
        created: !!group,
        group,
      }
    } catch (e) {
      console.error(e)

      return { created: false }
    }
  }

  static async edit(data) {
    const {
      groupID: id,
      entry,
      graduation,
      specialtyID,
      number,
    } = data

    const groupData = {
      entry,
      graduation,
      specialtyID,
      number,
    }

    try {
      const [update] = await Groups.update(groupData, {
        where: { id },
      })

      return {
        edited: !!update,
        group: groupData,
      }
    } catch (e) {
      return { edited: false }
    }
  }

  static getGroupName(data) {
    const {
      number,
      entry,
      symbol,
      graduation,
    } = data

    const graduationTime = new Date(graduation)
    const entryTime = new Date(entry)
    const currentTime = new Date()

    if (currentTime > graduationTime) {
      const stringEntryTime = `${entryTime.getUTCDate()}/${entryTime.getUTCMonth()}/${entryTime.getFullYear()}`
      const stringGraduationTime = `${graduationTime.getUTCDate()}/${graduationTime.getUTCMonth()}/${graduationTime.getFullYear()}`

      const lastGroupStudyYear = graduationTime.getFullYear() - entryTime.getFullYear()

      return `[${stringEntryTime} - ${stringGraduationTime}] ${symbol}-${lastGroupStudyYear}${number}`
    }

    entryTime.setDate(graduationTime.getDate())
    entryTime.setMonth(graduationTime.getMonth())

    const groupYears = Math.ceil(((currentTime - entryTime) / 1000) / 60 / 60 / 24 / 365)

    return `${symbol}-${groupYears}${number}`
  }

  static async get({ groupID: id }) {
    const errors = []

    try {
      const group = await Groups.findOne({
        where: { id },
        include: [
          {
            model: Specialty,
            as: 'specialty',
            required: true,
          },
          {
            model: Students,
            as: 'students',
          },
          {
            model: Classes,
            as: 'classes',
            attributes: ['subjectID'],
            include: [{
              model: Subjects,
              as: 'subject',
              include: {
                model: SubjectTypes,
                as: 'subjectTypeData',
              },
            }],
          },
        ],
      })

      if (!group) {
        errors.push({
          msg: 'There is no such group',
          location: 'body',
          param: 'groupID',
        })

        return { errors }
      }

      const {
        entry,
        number,
        graduation,
        specialty: {
          symbol,
        },
      } = group

      const name = this.getGroupName({
        entry,
        number,
        graduation,
        symbol,
      })

      const schedule = await this.getGroupSchedule({ id })

      return {
        group: {
          ...group.dataValues,
          name,
          schedule,
        },
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getStatistics({ groupID, semesterID }) {
    const errors = []

    try {
      const groupExists = await Groups.findOne({
        where: { id: groupID },
        attributes: ['id'],
      })

      if (!groupExists) {
        errors.push({
          msg: 'Such group does not exist',
          param: 'groupID',
          location: 'body',
        })

        return { errors }
      }

      const students = await Students.findAll({
        where: { groupID },
        attributes: ['id', 'name'],
        include: {
          model: Marks,
          as: 'marks',
          attributes: ['type', 'mark', 'lessonID'],
          include: [
            {
              model: Lessons,
              as: 'lesson',
              attributes: ['date', 'classID'],
              required: true,
              include: {
                attributes: ['subjectID'],
                model: Classes,
                as: 'class',
                required: true,
                include: {
                  attributes: ['id'],
                  model: Subjects,
                  as: 'subject',
                  required: true,
                  include: {
                    model: Hours,
                    as: 'hours',
                    where: { semesterID },
                  },
                },
              },
            },
          ],
        },
      })

      const lessonsCount = await Lessons.count({
        include: {
          model: Classes,
          as: 'class',
          where: {
            groupID,
          },
        },
      })

      const info = {
        students: [],
        groupAVG: 0,
        marksValuesCount: 0,
        marksCount: 0,
        groupMissingsCount: 0,
        lessonsCount,
      }

      students.forEach((student) => {
        const studentData = student.toJSON()

        const studyProgress = {
          avg: 0,
          marksValuesCount: 0,
          marksCount: 0,
        }

        if (!student.marks.length) {
          info.students.push({
            ...studyProgress,
            ...studentData,
          })

          return
        }

        student.marks.forEach(({ mark, type }) => {
          if (type !== 'miss') {
            studyProgress.marksValuesCount += mark
            studyProgress.marksCount += 1

            info.marksValuesCount += mark

            info.marksCount += 1
          } else {
            info.groupMissingsCount += 1
          }
        })

        studyProgress.avg = studyProgress.marksValuesCount / studyProgress.marksCount

        info.students.push({
          ...studyProgress,
          ...studentData,
        })
      })

      info.students.sort((studentA, studentB) => studentB.avg - studentA.avg)

      info.groupAVG = +(info.marksValuesCount / info.marksCount).toFixed(5)

      return info
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getAll({ specialtyID }) {
    const errors = []

    try {
      const specialty = await Specialty.findOne({
        where: {
          id: specialtyID,
        },
      })

      if (!specialty) {
        errors.push({
          msg: 'Such specialty does not exist',
          param: 'specialtyID',
          location: 'body',
        })

        return { errors }
      }

      const { symbol } = specialty

      const groupsRaw = await Groups.findAll({
        order: [['specialtyID'], ['number']],
        where: { specialtyID },
        include: {
          attributes: ['id'],
          model: Students,
          as: 'students',
        },
      })

      const groups = []

      groupsRaw.forEach((group) => {
        const {
          entry,
          number,
          graduation,
        } = group

        const name = this.getGroupName({
          entry,
          number,
          graduation,
          symbol,
        })

        groups.push({
          ...group.dataValues,
          name,
        })
      })

      return { groups }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getGroupSchedule({ id: groupID }) {
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
                groupID,
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
                {
                  model: Teachers,
                  as: 'teacher',
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
                groupID,
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
                {
                  model: Teachers,
                  as: 'teacher',
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
                groupID,
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
                {
                  model: Teachers,
                  as: 'teacher',
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
                groupID,
                subgroups: 1,
              },
              include: [
                {
                  model: Subgroups,
                  as: 'subgroup',
                },
                {
                  model: Groups,
                  as: 'group',
                },
                {
                  model: Subjects,
                  as: 'subject',
                },
                {
                  model: Teachers,
                  as: 'teacher',
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
                groupID,
                subgroups: 1,
              },
              include: [
                {
                  model: Subgroups,
                  as: 'subgroup',
                },
                {
                  model: Groups,
                  as: 'group',
                },
                {
                  model: Subjects,
                  as: 'subject',
                },
                {
                  model: Teachers,
                  as: 'teacher',
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
                groupID,
                subgroups: 1,
              },
              include: [
                {
                  model: Groups,
                  as: 'group',
                },
                {
                  model: Subgroups,
                  as: 'subgroup',
                },
                {
                  model: Subjects,
                  as: 'subject',
                },
                {
                  model: Teachers,
                  as: 'teacher',
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

  static async getSubgroups({ groupID }) {
    try {
      const subgroups = await Subgroups.findAll({
        where: { groupID },
      })

      return { subgroups }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
