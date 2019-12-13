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

import config from '../../configs/students'

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
      const studentExists = await Students.count({
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

      if (!userData || userData.teacher) {
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

      if (!update) {
        return { edited: false }
      }

      return {
        edited: true,
        student: {
          updateData,
          ...id,
        },
      }
    } catch (e) {
      return { edited: false }
    }
  }

  static async get({ studentID: id }) {
    const errors = []

    try {
      const student = await Students.findOne({
        where: { id },
        include: [
          {
            model: Groups,
            as: 'group',
          },
          {
            model: Users,
            as: 'user',
          },
        ],
      })

      if (!student) {
        errors.push({
          msg: 'No such student',
          param: 'studentID',
          location: 'body',
        })

        return { errors }
      }

      return student
    } catch (e) {
      console.error(e)

      return { fetched: false }
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
              attributes: ['id'],
              model: Subgroups,
              as: 'subgroup',
              include: [
                {
                  model: Classes,
                  as: 'class',
                  include: [
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

  static async list({ page }) {
    const order = [
      ['id', 'DESC'],
    ]

    const { itemsOnPage: limit } = config

    try {
      const students = await Students.findAll({
        order,
        limit,
        offset: limit * page,
        include: [
          {
            attributes: ['name', 'id', 'address', 'email'],
            model: Users,
            as: 'user',
          },
          {
            model: Groups,
            as: 'group',
          },
        ],
      })

      const hasNextPage = await Students.findOne({
        order,
        limit,
        offset: (limit * (page + 1)),
        attributes: ['id'],
      })

      return {
        students,
        hasNextPage: !!hasNextPage,
      }
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
