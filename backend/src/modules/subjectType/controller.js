import SubjectType from '../../models/subject_types'

export default class SubjectTypeController {
  static async createSubjectType({ name, coefficient }) {
    const create = await SubjectType.create({
      name,
      coefficient,
    })

    if (!create.dataValues) {
      return { created: false }
    }

    return {
      created: true,
      subjectType: create.dataValues
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
