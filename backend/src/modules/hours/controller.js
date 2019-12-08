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
          param: 'subjectID',
          msg: 'Hours with such semester and subject already exists',
        })

        return { errors }
      }

      const create = await Hours.create({
        hours,
        semesterID,
        subjectID,
      })

      if (!create.dataValues) {
        return { created: false }
      }

      return {
        created: true,
        hours: create.dataValues,
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

      if (!edit) {
        return { edited: false }
      }

      return {
        edited: true,
        hours: newData,
      }
    } catch (e) {
      return { edited: false }
    }
  }
}
