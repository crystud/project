import lessons from '../../models/lessons'

export default class lessonsController {
  static async create(data) {
    const errors = []
    const {
      classID,
      date,
      topic,
      homeWork,
    } = data

    const isTaken = await lessons.findAll({
      where: { classID, date },
    })

    if (isTaken.length) {
      errors.push({
        msg: 'This class has a lesson in this time already',
        param: 'classId, date',
        location: 'body',
      })
      return { errors }
    }

    const created = await lessons.create({
      classID,
      date,
      topic,
      home_work: homeWork,
    })

    return { created: created !== null }
  }

  static async setTopic({ lessonId, topic }) {
    const [updated] = await lessons.update({
      topic,
    }, {
      where: { id: lessonId },
    })

    if (!updated) {
      return { updated: false }
    }

    return {
      became: topic,
      lesson: lessonId,
    }
  }

  static async setHomeWork({ lessonId, homeWork }) {
    const [updated] = await lessons.update({
      home_work: homeWork,
    }, {
      where: { id: lessonId },
    })

    if (!updated) {
      return { updated: false }
    }

    return {
      became: homeWork,
      lesson: lessonId,
    }
  }
}
