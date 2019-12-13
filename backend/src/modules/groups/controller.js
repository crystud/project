import Groups from '../../models/groups'
import Specialty from '../../models/specialty'
import Students from '../../models/students'
import Marks from '../../models/marks'
import Lessons from '../../models/lessons'

import config from '../../configs/groups'

export default class GroupsController {
  static async create(data) {
    const errors = []

    try {
      const exists = await Groups.count({
        where: data,
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
      symbol,
    } = data

    const groupData = {
      entry,
      graduation,
      specialtyID,
      number,
      symbol,
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

  static async get({ groupID: id }) {
    const errors = []

    try {
      const group = await Groups.findOne({
        where: { id },
        include: [
          {
            model: Specialty,
            as: 'specialty',
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

      return { group }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async getStatistics({ groupID }) {
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
          include: {
            model: Lessons,
            as: 'lesson',
            attributes: ['date'],
          },
        },
      })

      const info = {
        students: [],
        groupAVG: 0,
        marksValuesCount: 0,
        marksCount: 0,
      }

      students.forEach((student) => {
        const studentData = student.toJSON()

        const studyProgress = {
          avg: 0,
          marksValuesCount: 0,
        }

        if (!student.marks.length) {
          info.students.push({
            ...studyProgress,
            ...studentData,
          })

          return
        }

        student.marks.forEach(({ mark }) => {
          studyProgress.marksValuesCount += mark
          info.marksValuesCount += mark

          info.marksCount += 1
        })

        studyProgress.avg = studyProgress.marksValuesCount / student.marks.length

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

  static async list({ page }) {
    const { itemsOnPage: limit } = config
    const order = [['symbol'], ['number']]

    try {
      const groups = await Groups.findAll({
        order,
        limit,
        offset: page * limit,
        include: {
          attributes: ['id'],
          model: Students,
          as: 'students',
        },
      })

      const hasNextPage = await Groups.findOne({
        limit,
        offset: (page + 1) * limit,
      })

      return {
        hasNextPage: !!hasNextPage,
        groups,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
