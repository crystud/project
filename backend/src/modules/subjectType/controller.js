import SubjectType from '../../models/subject_types'

export default class SubjectTypeController {
  static async createSubjectType({ name, coefficient }) {
    const errors = []

    const subjectTypeData = {
      name,
      coefficient,
    }

    try {
      const exists = await SubjectType.findAll({
        where: subjectTypeData,
      })

      if (exists.length) {
        errors.push({
          msg: 'Such subject type already exist',
          param: 'name',
          location: 'body',
        })

        return { errors }
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

  static async get({ subjectTypeID: id }) {
    const errors = []

    try {
      const subjectType = await SubjectType.findOne({
        where: { id },
      })

      if (!subjectType) {
        errors.push({
          msg: 'Such subject type does not exist',
          param: 'subjectTypeID',
          location: 'body',
        })

        return { errors }
      }

      return { subjectType }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
