import ScoringSystems from '../../models/scoring_systems'

export default class ScoringSystemsController {
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
          name,
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

  static async list() {
    const order = [['id', 'DESC']]

    try {
      const scoringSystems = await ScoringSystems.findAll({
        order,
      })

      return { scoringSystems }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
