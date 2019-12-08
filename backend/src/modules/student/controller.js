import Students from '../../models/students'
import Groups from '../../models/groups'
import Users from '../../models/users'

export default class StudentController {
  static async create(data) {
    const errors = []

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
        errors.push({
          location: 'body',
          param: 'name',
          msg: 'Student with such name id already exist',
        })

        return { errors }
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

  static async get({ studentID: id }) {
    const errors = []

    try {
      const student = await Students.findOne({
        where: { id },
        include: [
          {
            model: Groups,
            as: 'group',
          },
          {
            model: Users,
            as: 'user',
          },
        ],
      })

      if (!student) {
        errors.push({
          msg: 'No such student',
          param: 'studentID',
          location: 'body',
        })

        return { errors }
      }

      return student
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
