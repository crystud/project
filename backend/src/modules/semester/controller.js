import Semesters from '../../models/semesters'
import Specialties from '../../models/specialty'
import Subjects from '../../models/subjects'
import Commissions from '../../models/commissions'
import Hours from '../../models/hours'

export default class SemestersController {
  static async create(semester) {
    const { number, specialtyID } = semester

    const errors = []

    const specialty = await Specialties.findOne({
      attributes: ['id'],
      where: {
        id: specialtyID,
      },
    })

    if (!specialty) {
      errors.push({
        msg: 'The specialty doesn`t exist',
        param: 'specialtyID',
        location: 'body',
      })

      return { errors }
    }

    const recordExists = await Semesters.findOne({
      attributes: ['id'],
      where: {
        number,
        specialtyID,
      },
    })

    if (recordExists) {
      errors.push({
        msg: 'The record exists',
        param: ['number', 'specialtyID'],
        location: 'body',
      })

      return { errors }
    }

    const created = await Semesters.create(semester)

    return {
      created: !!created,
      semester: created,
    }
  }

  static async edit(semester) {
    const {
      id, number, weeks, specialtyID,
    } = semester

    const errors = []

    const recordExists = await Semesters.findOne({
      attributes: ['id'],
      where: {
        number,
        specialtyID,
      },
    })

    if (recordExists) {
      errors.push({
        msg: 'The record exists',
        param: ['number', 'specialtyID'],
        location: 'body',
      })

      return { errors }
    }

    const noRecord = await Semesters.findOne({
      attributes: ['id'],
      where: {
        id,
      },
    })

    if (!noRecord) {
      errors.push({
        msg: 'The record doesn`t exist',
        param: 'id',
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

  static async getAll({ specialtyID }) {
    try {
      const semesters = await Semesters.findAll({
        where: {
          specialtyID,
        },
        order: [['number']],
      })

      return { semesters }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }

  static async get({ semesterID: id }) {
    const errors = []

    try {
      const semester = await Semesters.findOne({
        where: { id },
        include: {
          model: Specialties,
          as: 'specialty',
        },
      })

      if (!semester) {
        errors.push({
          msg: 'Such semester does not exist',
          location: 'body',
          param: 'semesterID',
        })

        return { errors }
      }

      const commissions = await Commissions.findAll({
        include: {
          model: Subjects,
          required: true,
          include: [
            {
              model: Hours,
              as: 'hours',
              include: {
                model: Semesters,
                where: {
                  id,
                },
              },
            },
          ],
        },
      })

      return {
        semester: {
          ...semester.toJSON(),
          commissions,
        },
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
