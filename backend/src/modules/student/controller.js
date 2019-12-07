import Students from '../../models/students'

export default class StudentController {
  static async create(data) {
    const {
      name,
      groupID,
      userID,
      address,
    } = data

    try {
      const exists = await Students.findAll({
        where: { userID },
      })

      if (exists.length) {
        return {
          created: false,
          location: 'body',
          param: 'name',
          msg: 'Student with such name id already exist',
        }
      }

      const create = await Students.create({
        name,
        groupID,
        address,
        userID,
      })

      if (!create.dataValues) {
        return { created: false }
      }

      return {
        created: true,
        student: create.dataValues,
      }
    } catch (e) {
      return { created: false }
    }
  }

  static async edit(data) {
    const {
      name,
      groupID,
      userID,
      address,
      studentID: id,
    } = data

    const updateData = {
      name,
      groupID,
      userID,
      address,
    }

    try {
      const [update] = await Students.update(updateData, {
        where: { id },
      })

      if (!update) {
        return { edited: false }
      }

      return {
        edited: true,
        student: {
          updateData,
          ...id,
        },
      }
    } catch (e) {
      return { edited: false }
    }
  }
}
