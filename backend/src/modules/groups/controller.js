import Groups from '../../models/groups'
import Specialty from '../../models/specialty'
import Students from '../../models/students'
import Marks from '../../models/marks'
import Lessons from '../../models/lessons'
import Classes from '../../models/classes'
import Subjects from '../../models/subjects'
import Hours from '../../models/hours'

export default class GroupsController {
  static async create(data) {
    const errors = []

    const { specialtyID, number } = data

    try {
      const exists = await Groups.count({
        where: {
          specialtyID,
          number,
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

      return {
        ...group.dataValues,
        name,
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
}
