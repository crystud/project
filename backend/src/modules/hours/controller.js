import Hours from '../../models/hours'

export default class HoursController {
  static async create({ hours, semesterID, subjectID }) {
    const errors = []

    try {
      const exists = await Hours.findAll({
        where: {
          subjectID,
          semesterID,
        },
      })

      if (exists.length) {
        errors.push({
          location: 'body',
          param: ['subjectID', 'semesterID'],
          msg: 'Hours with such semester and subject already exists',
        })

        return { errors }
      }

      const create = await Hours.create({
        hours,
        semesterID,
        subjectID,
      })

      return {
        created: !!create,
        hours: create || null,
      }
    } catch (e) {
      return { created: false }
    }
  }

  static async edit(data) {
    const {
      hoursID: id,
      hours,
      semesterID,
      subjectID,
    } = data

    const newData = {
      hours,
      semesterID,
      subjectID,
    }

    try {
      const [edit] = await Hours.update(newData, {
        where: { id },
      })

      return {
        edited: !!edit,
        hours: newData || null,
      }
    } catch (e) {
      return { edited: false }
    }
  }
}
