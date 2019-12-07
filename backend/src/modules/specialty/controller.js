import Specialty from '../../models/specialty'
import { adminRoleName } from '../../configs/roles'

export default class SpecialtysController {
  static async createSpecialty(data) {
    const {
      departmentID,
      name,
    } = data

    try {
      const specialtyData = {
        departmentID,
        name,
      }

      const exists = await Specialty.findAll({
        where: specialtyData,
      })

      if (exists.length) {
        return {
          created: false,
          msg: 'Specialty with such data already exist',
          location: 'body',
          param: 'name',
        }
      }

      const create = await Specialty.create(specialtyData)

      if (!create.dataValues) {
        return { created: false }
      }

      return {
        created: true,
        specialty: create.dataValues,
      }
    } catch (e) {
      return { created: false }
    }
  }

  static async editSpecialty(data) {
    const {
      name,
      departmentID,
      user,
      specialtyID: id,
    } = data

    if (!user.roles.includes(adminRoleName)) {
      return { created: false }
    }

    try {
      const [update] = await Specialty.update({
        name,
        departmentID,
      }, {
        where: { id },
      })

      if (!update) {
        return { updated: false }
      }

      return {
        updated: true,
        specialty: update.dataValues,
      }
    } catch (e) {
      return { updated: false }
    }
  }
}
