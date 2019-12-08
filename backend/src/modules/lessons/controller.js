import lessons from '../../models/lessons'
// import { adminRoleName } from '../../configs/roles'

export default class lessonsController {
  static async create(data) {
    try {
      const {
        classID,
        date,
        topic,
        home_work,
      } = data

      const isTaken = await lessons.findAll({
        where: classID, date,
      })

      if (isTaken.length) {
        return {
          msg: 'This class has a lesson in this time already',
          param: 'classId, date',
          location: 'body',
        }
      }

      const lessonData = {
        classID,
        date,
        topic,
        home_work,
      }

      const created = await lessons.create(lessonData)

      if (created) return { created: true }
      return { created: false }
    } catch (e) {
      return { error: e }
    }
  }

  static async setTopic({ lessonId, /* user, */ topic }) {
    try {
      // if (!user.roles.includes(adminRoleName)) {
      // return { updated: false }
      // }
      const updated = await lessons.update({
        topic,
      }, {
        where: { id: lessonId },
      })

      if (!updated.dataValues) {
        return { updated: false }
      }

      return {
        updated: true,
        lesson: updated.dataValues,
      }
    } catch (e) {
      return { errors: e }
    }
  }

  static async setHomeWork({ lessonId, /* user, */ homeWork }) {
    try {
      // if (!user.roles.includes(adminRoleName)) {
      // return { updated: false }
      // }

      const updated = await lessons.update({
        home_work: homeWork,
      }, {
        where: { id: lessonId },
      })

      if (!updated.dataValues) {
        return { updated: false }
      }

      return {
        updated: true,
        lesson: updated.dataValues,
      }
    } catch (e) {
      return { errors: e }
    }
  }
}
