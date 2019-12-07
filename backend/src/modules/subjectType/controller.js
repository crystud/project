import SubjectType from '../../models/subject_types'

export default class SubjectTypeController {
  static async createSubjectType({ name, coefficient }) {
    const subjectTypeData = {
      name,
      coefficient,
    }

    try {
      const exists = await SubjectType.findAll({
        where: subjectTypeData,
      })

      if (exists.length) {
        return {
          created: false,
          msg: 'Such subject type already exist',
          param: 'name',
          location: 'body',
        }
      }

      const create = await SubjectType.create(subjectTypeData)

      if (!create.dataValues) {
        return { created: false }
      }

      return {
        created: true,
        subjectType: create.dataValues,
      }
    } catch (e) {
      return { created: false }
    }
  }

  static async editSubjectType(data) {
    const {
      name,
      coefficient,
      subjectTypeID: id,
    } = data

    const [edit] = await SubjectType.update({
      name,
      coefficient,
    }, {
      where: { id },
    })

    if (!edit) {
      return { edited: false }
    }

    return {
      edited: true,
      subjectType: {
        name,
        coefficient,
      },
    }
  }
}
