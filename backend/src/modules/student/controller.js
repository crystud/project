import sequelize from 'sequelize'

import Students from '../../models/students'
import Groups from '../../models/groups'
import Users from '../../models/users'
import Marks from '../../models/marks'
import Lessons from '../../models/lessons'
import Teachers from '../../models/teachers'
import Classes from '../../models/classes'
import SubgroupsStudents from '../../models/subgroups_students'
import Subgroups from '../../models/subgroups'
import Rooms from '../../models/rooms'
import Subjects from '../../models/subjects'
import Timetable from '../../models/timetable'
import Schedule from '../../models/schedule'
import Specialty from '../../models/specialty'
import SubjectTypes from '../../models/subject_types'
import ScoringSystems from '../../models/scoring_systems'

import GroupsController from '../groups/controller'

export default class StudentController {
  static async create(data) {
    const errors = []

    const {
      name,
      groupID,
      userID,
      address,
    } = data

    try {
      const studentExists = await Students.findOne({
        attributes: ['id'],
        where: { userID },
      })

      if (studentExists) {
        errors.push({
          location: 'body',
          param: 'name',
          msg: 'Student with such id already exist',
        })

        return { errors }
      }

      const groupsExists = await Groups.count({
        where: { id: groupID },
      })

      if (!groupsExists) {
        errors.push({
          msg: 'Such group does not exist',
          param: 'groupID',
          location: 'body',
        })
      }

      const userData = await Users.findOne({
        where: { id: userID },
        attributes: ['id'],
        include: {
          model: Teachers,
          as: 'teacher',
          attributes: ['id'],
        },
      })

      if (!userData) {
        errors.push({
          msg: 'Such user does not exist',
          location: 'body',
          param: 'userID',
        })

        return { errors }
      }

      if (userData.teacher) {
        errors.push({
          msg: 'Teacher cannot be a student',
          location: 'body',
          param: 'userID',
        })

        return { errors }
      }

      const create = await Students.create({
        name,
        groupID,
        address,
        userID,
      })

      return {
        created: !!create,
        student: create,
      }
    } catch (e) {
      console.error(e)

      return { created: false }
    }
  }

  static async edit(data) {
    const {
      name,
      groupID,
      userID,
      address,
      studentID: id,
    } = data

    const updateData = {
      name,
      groupID,
      userID,
      address,
    }

    try {
      const [update] = await Students.update(updateData, {
        where: { id },
      })

      return {
        edited: !!update,
        student: {
          updateData,
          ...id,
        },
      }
    } catch (e) {
      return { edited: false }
    }
  }

  static async get({ studentID }) {
    const errors = []

    try {
      const student = await Students.findOne({
        where: {
          id: studentID,
        },
        include: [
          {
            model: Groups,
            as: 'group',
            include: {
              model: Specialty,
              as: 'specialty',
            },
          },
          {
            model: Users,
            as: 'user',
            attributes: {
              exclude: ['password', 'name', 'isAdmin'],
            },
          },
        ],
      })

      const {
        entry,
        graduation,
        number,
        specialty: {
          symbol,
        },
      } = student.group

      const groupName = await GroupsController.getGroupName({
        entry,
        graduation,
        number,
        symbol,
      })

      if (!student) {
        errors.push({
          msg: 'No such student',
          param: 'studentID',
          location: 'body',
        })

        return { errors }
      }

      const [groupClassesMarks, subgroupsClassesMarks, schedule] = await Promise.all([
        Classes.findAll({
          where: {
            groupID: student.groupID,
            subgroups: false,
          },
          include: {
            model: Lessons,
            as: 'lessons',
            include: {
              model: Marks,
              as: 'marks',
              where: { studentID },
            },
          },
        }),

        SubgroupsStudents.findAll({
          where: { studentID },
          include: {
            model: Subgroups,
            as: 'subgroup',
            required: true,
            include: {
              model: Classes,
              as: 'classes',
              where: { subgroups: true },
              include: {
                model: Lessons,
                as: 'lessons',
                include: {
                  model: Marks,
                  as: 'marks',
                },
              },
            },
          },
        }),

        this.getSchedule({ studentID }),
      ])

      return {
        student: {
          ...student.toJSON(),
          groupClassesMarks,
          subgroupsClassesMarks,
          schedule,
          groupName,
        },
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getSchedule({ studentID }) {
    try {
      const student = await Students.findOne({
        attributes: ['groupID'],
        where: {
          id: studentID,
        },
      })

      if (!student) {
        return null
      }

      const { groupID } = student

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
              order: [['order']],
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
              order: [['order']],
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
              order: [['order']],
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
                  required: true,
                  include: {
                    model: SubgroupsStudents,
                    as: 'students',
                    where: { studentID },
                    required: true,
                  },
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
              order: [['order']],
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
                  required: true,
                  include: {
                    model: SubgroupsStudents,
                    as: 'students',
                    where: { studentID },
                    required: true,
                  },
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
              order: [['order']],
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
                  required: true,
                  include: {
                    model: SubgroupsStudents,
                    as: 'students',
                    where: { studentID },
                    required: true,
                  },
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
              order: [['order']],
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
              numDenominatorClass: true,
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
              numDenominatorClass: true,
              order,
            },
          })
        }

        if (scheduleClassData !== null) {
          if (!scheduleClassData.denom) {
            scheduleClassData.denom = {
              subgroups: [],
            }
          }

          if (!scheduleClassData.denom.subgroups) {
            scheduleClassData.denom = {
              subgroups: [],
            }
          }

          scheduleClassData.denom.subgroups.push(classData)

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

  static async getGlobalStatistics(data) {
    try {
      const stats = await this.getCustomRangeStatistics(data)

      return { stats }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getWeekStatistics(data) {
    try {
      const endTime = new Date()
      const startTime = new Date(endTime.getTime() - (86400 * 7 * 1000))

      const ranges = {
        startTime,
        endTime,
      }

      const stats = await this.getCustomRangeStatistics({
        ...data,
        ranges,
      })

      return { stats, ranges }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getMonthStatistics(data) {
    try {
      const endTime = new Date()
      const startTime = new Date(endTime.getTime() - (86400 * 31 * 1000))

      const ranges = {
        startTime,
        endTime,
      }

      const stats = await this.getCustomRangeStatistics({
        ...data,
        ranges,
      })

      return { stats, ranges }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async loadSemesterStatistics({ studentID, semesterID }) {
    try {
      const marks = await Marks.findAll({
        where: { studentID },
        include: [{
          model: Lessons,
          as: 'lesson',
          include: {
            model: Classes,
            as: 'class',
            where: { semesterID },
            include: {
              model: Subjects,
              as: 'subject',
              include: {
                model: SubjectTypes,
                as: 'subjectTypeData',
                include: {
                  model: ScoringSystems,
                  as: 'scoring_system',
                },
              },
            },
          },
        }],
        order: [
          [{
            model: Lessons,
            as: 'lesson',
          }, 'date', 'asc'],
        ],
      })

      const current = {
        avg: 0,
        marksValulesCount: 0,
        marksCount: 0,
      }

      marks.forEach(({ mark, type }) => {
        if (type === 'miss') return

        current.marksValulesCount += mark
        current.marksCount += 1
      })

      current.avg = current.marksCount !== 0 ? current.marksValulesCount / current.marksCount : 0

      return { marks, current }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getStudentTeachers({ studentID }) {
    const errors = []

    try {
      const studentGroup = await Students.findOne({
        attributes: ['groupID'],
        where: {
          id: studentID,
        },
      })

      if (!studentGroup) {
        errors.push({
          msg: 'Student does not exists or has no group',
          param: 'studentID',
          location: 'body',
        })

        return { errors }
      }

      const { groupID } = studentGroup

      const [simpleClassTeachers, subgroupsTeachers] = await Promise.all([
        Teachers.findAll({
          include: [
            {
              model: Classes,
              as: 'class',
              where: { groupID },
            },
            {
              model: Users,
              as: 'user',
              attributes: ['email'],
            },
          ],
        }),
        SubgroupsStudents.findAll({
          where: { studentID },
          attributes: ['id'],
          include: [
            {
              model: Subgroups,
              as: 'subgroup',
              attributes: ['id'],
              include: [
                {
                  model: Classes,
                  as: 'classes',
                  include: [
                    {
                      model: Subjects,
                      as: 'subject',
                      attributes: ['name'],
                    },
                    {
                      model: Teachers,
                      as: 'teacher',
                      include: {
                        attributes: ['email'],
                        model: Users,
                        as: 'user',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        }),
      ])

      return {
        simpleClassTeachers,
        subgroupsTeachers,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getAll({ groupID }) {
    try {
      const students = await Students.findAll({
        attributes: {
          exclude: ['groupID'],
        },
        order: [['id', 'DESC']],
        where: { groupID },
      })

      return { students }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getCustomRangeStatistics(data) {
    const errors = []

    const {
      studentID,
      ranges: {
        startTime = null,
        endTime = null,
      } = {},
    } = data

    const where = {}

    if (startTime && endTime) {
      where.date = {
        [sequelize.Op.lt]: new Date(endTime),
        [sequelize.Op.gt]: new Date(startTime),
      }
    }

    try {
      const studentExists = await Students.findOne({
        where: {
          id: studentID,
        },
      })

      if (!studentExists) {
        errors.push({
          msg: 'Such student does not exists',
          location: 'body',
          param: 'studentID',
        })

        return { errors }
      }

      const rangeStudentMarks = await Marks.findAll({
        where: { studentID },
        attributes: ['mark', 'type'],
        include: [
          {
            attributes: ['topic', 'date'],
            model: Lessons,
            as: 'lesson',
            order: ['date'],
            where,
          },
        ],
      })

      const studentHadLessons = await Lessons.count({ where })

      const info = {
        studentHadLessons,
        missedLessonsPercentage: 0,
        avgMark: 0,
        marksCount: 0,
        marksValuesCount: 0,
        studentWasMissing: 0,
        marksList: [],
      }

      rangeStudentMarks.forEach((markObj) => {
        const {
          type,
          mark,
          lesson: {
            date,
            topic,
          },
        } = markObj

        info.marksList.push({
          mark,
          date,
          topic,
        })

        if (type === 'mark') {
          info.marksCount += 1
          info.marksValuesCount += mark

          return false
        }

        info.studentWasMissing += 1

        return false
      })

      const missingsDelta = info.studentWasMissing / info.studentHadLessons

      info.avgMark = +(info.marksValuesCount / info.marksCount).toFixed(4)
      info.missedLessonsPercentage = +(missingsDelta * 100).toFixed(2)

      return info
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
