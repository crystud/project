import SubjectType from '../../models/subject_types'
import ScoringSystems from '../../models/scoring_systems'

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

      return {
        created: !!create,
        subjectType: create || null,
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

    return {
      edited: !!edit,
      subjectType: edit ? {
        name,
        coefficient,
      } : null,
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

  static async getAll() {
    try {
      const subjectTypes = await SubjectType.findAll({
        order: [['name']],
        include: {
          model: ScoringSystems,
          as: 'scoring_system',
        },
      })

      return { subjectTypes }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
