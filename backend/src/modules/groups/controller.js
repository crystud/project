import Groups from '../../models/groups'

export default class GroupsController {
  static async create(data) {
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
        return {
          created: false,
          msg: 'Such group already exists',
          location: 'body',
          param: 'specialtyID',
        }
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
}
