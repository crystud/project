import Subject from '../../models/subjects'
import Commissions from '../../models/commissions'
import SubjectTypes from '../../models/subject_types'
import ScoringSystems from '../../models/scoring_systems'

import Config from '../../configs/subjects'

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

  static async createScoringSystem(data) {
    const errors = []

    const {
      minPossibleMark: min,
      maxPossibleMark: max,
      minPassingMark: minMark,
      name,
    } = data

    try {
      const exists = await ScoringSystems.findOne({
        where: {
          min,
          max,
          minMark,
        },
      })

      if (exists) {
        errors.push({
          msg: 'Such scoring system already exists.',
          param: ['name', 'minPossibleMark', 'maxPossibleMark', 'minPassingMark'],
          location: 'body',
        })

        return { errors }
      }

      const create = await ScoringSystems.create({
        name,
        min,
        max,
        minMark,
      })

      return {
        created: !!create,
        scoringSystem: create || null,
      }
    } catch (e) {
      console.error(e)

      return { created: false }
    }
  }

  static async editScoringSystem(data) {
    const errors = []

    const {
      scoringSystemID,
      minPossibleMark: min,
      maxPossibleMark: max,
      minPassingMark: minMark,
      name,
    } = data

    try {
      const existsForChanges = await ScoringSystems.findOne({
        where: {
          id: scoringSystemID,
        },
      })

      if (!existsForChanges) {
        errors.push({
          msg: 'Such scoring system does not exists.',
          location: 'body',
          param: 'scoringSystemID',
        })

        return { errors }
      }

      const exists = await ScoringSystems.findOne({
        where: {
          min,
          max,
          minMark,
        },
      })

      if (exists) {
        errors.push({
          msg: 'Such scoring system already exists.',
          param: ['name', 'minPossibleMark', 'maxPossibleMark', 'minPassingMark'],
          location: 'body',
        })

        return { errors }
      }

      const [update] = await ScoringSystems.update({
        name,
        min,
        max,
        minMark,
      }, {
        where: {
          id: scoringSystemID,
        },
      })

      return {
        edited: !!update,
        scoringSystem: update ? data : null,
      }
    } catch (e) {
      console.error(e)

      return { edited: false }
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

  static async list({ page }) {
    try {
      const order = [
        ['id', 'DESC'],
      ]

      const subjects = await Subject.findAll({
        limit: Config.itemsOnPage,
        offset: Config.itemsOnPage * page,
        order,
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

      const hasNextPage = await Subject.findOne({
        offset: (Config.itemsOnPage * (page + 1)),
        order,
      })

      return {
        subjects,
        hasNextPage: !!hasNextPage,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
