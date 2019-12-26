import Lessons from '../../models/lessons'
import Classes from '../../models/classes'
import Teachers from '../../models/teachers'

export default class lessonsController {
  static async checkTeacherPriviligies({ user: { userID: id, roles }, classID }) {
    const errors = []

    try {
      if (!roles.includes('admin') && !roles.includes('teacher')) {
        errors.push({
          msg: 'You are not a teacher',
          location: 'authorization',
          param: 'roles',
        })

        return { errors }
      }

      const teacher = await Teachers.findOne({
        attributes: ['id'],
        where: { id },
      })

      if (!teacher) {
        errors.push({
          msg: 'You are not a teacher',
          location: 'authorization',
          param: 'userID',
        })

        return { errors }
      }

      const { id: teacherID } = teacher

      const teachersClass = await Classes.findOne({
        attributes: ['id'],
        where: {
          teacherID,
          id: classID,
        },
      })

      return { hasAccess: !!teachersClass }
    } catch (e) {
      console.error(e)

      return { hasAccess: false }
    }
  }

  static async create({ data, user }) {
    const errors = []

    const { classID, date } = data

    const { hasAccess } = await this.checkTeacherPriviligies({ user, classID })

    if (!hasAccess) {
      errors.push({
        msg: 'Access denied',
        location: 'authorization',
        param: 'roles',
      })

      return { errors }
    }

    const isTaken = await Lessons.findOne({
      where: { classID, date },
      attributes: ['id'],
    })

    if (isTaken) {
      errors.push({
        msg: 'Such lesson already exist',
        param: ['classID', 'date'],
        location: 'body',
      })

      return { errors }
    }

    const created = await Lessons.create(data)

    return {
      created: !!created,
      lesson: created,
    }
  }

  static async setTopic({ data: { lessonId: id, topic }, user }) {
    const errors = []

    try {
      const lessonData = await Lessons.findOne({
        attributes: ['classID'],
        where: { id },
      })

      if (!lessonData) {
        errors.push({
          msg: 'Such lesson does not exist',
          location: 'body',
          param: 'lessonId',
        })

        return { errors }
      }

      const { classID } = lessonData

      const { hasAccess } = await this.checkTeacherPriviligies({ user, classID })

      if (!hasAccess) {
        errors.push({
          msg: 'Access denied',
          location: 'authorization',
          param: 'roles',
        })

        return { errors }
      }

      const [updated] = await Lessons.update({ topic }, {
        where: { id },
      })

      return {
        updated: !!updated,
      }
    } catch (e) {
      console.error(e)

      return { updated: false }
    }
  }

  static async setHomeWork({ data, user }) {
    const errors = []

    try {
      const { lessonId: id, homeWork } = data

      const lessonData = await Lessons.findOne({
        attributes: ['classID'],
        where: { id },
      })

      if (!lessonData) {
        errors.push({
          msg: 'Such lesson does not exist',
          location: 'body',
          param: 'lessonId',
        })

        return { errors }
      }

      const { classID } = lessonData

      const { hasAccess } = await this.checkTeacherPriviligies({ user, classID })

      if (!hasAccess) {
        errors.push({
          msg: 'Access denied',
          location: 'authorization',
          param: 'roles',
        })

        return { errors }
      }

      const [updated] = await Lessons.update({
        home_work: homeWork,
      }, {
        where: { id },
      })

      return {
        updated: !!updated,
      }
    } catch (e) {
      console.error(e)

      return { updated: false }
    }
  }
}
