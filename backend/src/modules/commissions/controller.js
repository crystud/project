import Commissions from '../../models/commissions'

export default class CommissionsController {
  static async create(commission) {
    const { name } = commission
    const errors = []

    const nameIsFree = await Commissions.findOne({
      attributes: ['id'],
      where: {
        name,
      },
    })

    if (nameIsFree) {
      errors.push({
        msg: 'Name is used',
        param: 'name',
        location: 'body',
      })

      return { errors }
    }

    const created = await Commissions.create({ name })

    return {
      created: !!created,
      commision: created,
    }
  }

  static async edit({ id, name }) {
    const [update] = await Commissions.update({ name }, {
      where: { id },
    })

    return {
      informationWasUpdated: !!update,
      commision: {
        id,
        name,
      },
    }
  }

  static async list({ page }) {
    const limit = 30

    try {
      const commissions = await Commissions.findAll({
        order: [['name']],
        limit,
        offset: page * limit,
      })

      const hasNextPage = await Commissions.findOne({
        offset: (page + 1) * limit,
      })

      return {
        commissions,
        hasNextPage: !!hasNextPage,
      }
    } catch (e) {
      console.error(e)

      return { fetched: false }
    }
  }
}
