import Specialty from '../../models/specialty'
import Departments from '../../models/departments'

export default class SpecialtysController {
  static async createSpecialty(data) {
    const errors = []

    try {
      const exists = await Specialty.findAll({
        where: data,
      })

      if (exists.length) {
        errors.push({
          msg: 'Specialty with such data already exist',
          location: 'body',
          param: 'name',
        })

        return { errors }
      }

      const create = await Specialty.create(data)

      return {
        created: !!create,
        specialty: create || null,
      }
    } catch (e) {
      return { created: false }
    }
  }

  static async editSpecialty(data) {
    const {
      name,
      departmentID,
      specialtyID: id,
    } = data

    try {
      const [update] = await Specialty.update({
        name,
        departmentID,
      }, {
        where: { id },
      })

      return {
        updated: !!update,
        specialty: update ? data : null,
      }
    } catch (e) {
      return { updated: false }
    }
  }

  static async get({ specialtyID: id }) {
    const errors = []

    try {
      const specialty = await Specialty.findOne({
        where: { id },
        include: {
          model: Departments,
          as: 'department',
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

      return { specialty }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
