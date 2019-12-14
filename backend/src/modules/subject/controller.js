import Subject from '../../models/subjects'
import Commissions from '../../models/commissions'
import SubjectTypes from '../../models/subject_types'
import ScoringSystems from '../../models/scoring_systems'

export default class SubjectController {
  static async createSubject(data) {
    const errors = []

    const {
      name,
      commissionID,
      subjectTypeID: subjectType,
      scoringSystemID,
    } = data

    const subjectData = {
      name,
      commissionID,
      subjectType,
      scoringSystemID,
    }

    try {
      const scoringSystemExists = await ScoringSystems.findOne({
        where: {
          id: scoringSystemID,
        },
      })

      if (!scoringSystemExists) {
        errors.push({
          msg: 'Such scoring system does not exist',
          param: 'scoringSystemID',
          location: 'body',
        })

        return { errors }
      }

      const exists = await Subject.findOne({
        where: subjectData,
      })

      if (exists) {
        errors.push({
          msg: 'Such subject already exists',
          param: 'name',
          location: 'body',
        })

        return { errors }
      }

      const create = await Subject.create(subjectData)

      return {
        created: !!create,
        subject: create || null,
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
            include: {
              as: 'scoring_system',
              model: ScoringSystems,
            },
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
      console.error(e)

      return { fetched: false }
    }
  }

  static async getAll() {
    try {
      const subjects = await Subject.findAll({
        order: ['id', 'DESC'],
        include: [
          {
            model: Commissions,
            as: 'commission',
            required: true,
          },
          {
            model: SubjectTypes,
            as: 'subjectTypeData',
            include: {
              model: ScoringSystems,
              as: 'scoring_system',
            },
            required: true,
          },
        ],
      })

      return { subjects }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
