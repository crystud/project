import Semesters from '../../models/semesters'
import Specialties from '../../models/specialty'

export default class SemestersController {
  static async create(semester) {
    const { number, specialtyID } = semester

    const errors = []

    const specialty = await Specialties.findAll({
      attributes: ['id'],
      where: {
        id: specialtyID,
      },
    })

    if (!specialty.length) {
      errors.push({
        msg: 'The specialty doesn`t exist',
        param: 'specialtyID',
        location: 'body',
      })

      return { errors }
    }

    const recordExists = await Semesters.findAll({
      attributes: ['id'],
      where: {
        number,
        specialtyID,
      },
    })

    if (recordExists.length) {
      errors.push({
        msg: 'The record exists',
        param: ['number', 'specialtyID'],
        location: 'body',
      })

      return { errors }
    }

    const created = await Semesters.create(semester)

    if (!created) {
      return { created: false }
    }

    return {
      created: true,
      semester,
    }
  }

  static async edit(semester) {
    const {
      id, number, weeks, specialtyID,
    } = semester

    const errors = []

    const recordExists = await Semesters.findAll({
      attributes: ['id'],
      where: {
        number,
        specialtyID,
      },
    })

    if (recordExists.length) {
      errors.push({
        msg: 'The record exists',
        param: ['number', 'specialtyID'],
        location: 'body',
      })

      return { errors }
    }

    const updated = await Semesters.update({ number, weeks, specialtyID }, {
      where: {
        id,
      },
    })

    if (!updated) {
      return { updated: false }
    }

    return {
      updated: true,
      semester,
    }
  }
}
