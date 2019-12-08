import Subject from '../../models/subjects'
import Commissions from '../../models/commissions'
import SubjectTypes from '../../models/subject_types'

export default class SubjectController {
  static async createSubject(data) {
    const errors = []

    const {
      name,
      commissionID,
      subjectTypeID: subjectType,
    } = data

    const subjectData = {
      name,
      commissionID,
      subjectType,
    }

    try {
      const exists = await Subject.findAll({
        where: subjectData,
      })

      if (exists.length) {
        errors.push({
          msg: 'Such subject already exists',
          param: 'name',
          location: 'body',
        })

        return { errors }
      }

      const create = await Subject.create(subjectData)

      if (!create.dataValues) {
        return { created: false }
      }

      return {
        created: true,
        subject: create.dataValues,
      }
    } catch (e) {
      return { created: false }
    }
  }

  static async editSubject(data) {
    const {
      subjectID: id,
      name,
      commissionID,
      subjectTypeID: subjectType,
    } = data

    const newData = {
      name,
      commissionID,
      subjectType,
    }

    const [edit] = await Subject.update(newData, {
      where: { id },
    })

    if (!edit) {
      return { edited: false }
    }

    return {
      edited: true,
      subject: newData,
    }
  }

  static async get({ subjectID: id }) {
    const errors = []

    try {
      const subject = await Subject.findOne({
        where: { id },
        include: [
          {
            as: 'commission',
            model: Commissions,
          },
          {
            as: 'subjectTypeData',
            model: SubjectTypes,
          },
        ],
      })

      if (!subject) {
        errors.push({
          msg: 'Such subject does not exist',
          param: 'subjectID',
          location: 'body',
        })

        return { errors }
      }

      return { subject }
    } catch (e) {
      return { fetched: false }
    }
  }
}
