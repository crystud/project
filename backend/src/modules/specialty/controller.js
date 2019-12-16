import Specialty from '../../models/specialty'
import Departments from '../../models/departments'

export default class SpecialtysController {
  static async createSpecialty(data) {
    const errors = []

    try {
      const exists = await Specialty.findOne({ where: data })

      if (exists) {
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
      console.error(e)

      return { created: false }
    }
  }

  static async editSpecialty(data) {
    const errors = []

    const {
      name,
      departmentID,
      symbol,
      specialtyID: id,
    } = data

    try {
      const exists = await Specialty.findOne({
        attributes: ['id'],
        where: {
          name,
          departmentID,
          symbol,
        },
      })

      if (exists) {
        errors.push({
          msg: 'Specialty with such data already exist',
          param: ['name', 'departmentID', 'symbol'],
          location: 'body',
        })

        return { errors }
      }

      const [update] = await Specialty.update({
        name,
        departmentID,
        symbol,
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

  static async list({ departmentID }) {
    try {
      const specialtys = await Specialty.findAll({
        order: [['name']],
        where: { departmentID },
      })

      return { specialtys }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
