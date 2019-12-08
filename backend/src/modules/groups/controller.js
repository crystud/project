import Groups from '../../models/groups'
import Specialty from '../../models/specialty'
import Students from '../../models/students'

export default class GroupsController {
  static async create(data) {
    const errors = []

    const {
      entry,
      graduation,
      specialtyID,
    } = data

    try {
      const groupData = {
        entry,
        graduation,
        specialtyID,
      }

      const exists = await Groups.findAll({
        where: groupData,
      })

      if (exists.length) {
        errors.push({
          msg: 'Such group already exists',
          location: 'body',
          param: 'specialtyID',
        })

        return { errors }
      }

      const create = await Groups.create(groupData)

      if (!create.dataValues) {
        return { created: false }
      }

      return {
        created: true,
        group: create.dataValues,
      }
    } catch (e) {
      return { created: false }
    }
  }

  static async edit(data) {
    const {
      groupID: id,
      entry,
      graduation,
      specialtyID,
    } = data

    const groupData = {
      entry,
      graduation,
      specialtyID,
    }

    try {
      const [update] = await Groups.update(groupData, {
        where: { id },
      })

      if (!update) {
        return { edited: false }
      }

      return {
        edited: true,
        group: groupData,
      }
    } catch (e) {
      return { edited: false }
    }
  }

  static async get({ groupID: id }) {
    const errors = []

    try {
      const group = await Groups.findOne({
        where: { id },
        include: [
          {
            model: Specialty,
            as: 'specialty',
          },
          {
            model: Students,
            as: 'students',
          },
        ],
      })

      if (!group) {
        errors.push({
          msg: 'There is no such group',
          location: 'body',
          param: 'groupID',
        })

        return { errors }
      }

      return { group }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
